
import * as React from "react";
import * as rx from "rxjs/Rx";
import { ComponentBase } from "../../../../../codebase/ComponentBase";
import { PeerConnection } from "../../../../../codebase/PeerConnection";
import { withClientApplicationContext } from "../../../../../components/context/WithClientApplicationContext";
import { MessagePillComponent } from "../../../../../components/messagePill/MessagePillComponent";
import { ClientApplication } from "../../ClientApplication";
import { FullScreenBtnComponent } from "./controls/FullScreenBtnComponent";
import { GetScreenshotBtnComponent } from "./controls/GetScreenshotBtnComponent";
import { PlayerPlayPauseBtnComponent } from "./controls/PlayerPlayPauseBtnComponent";
import { PlayerVolumeControlsComponent } from "./controls/PlayerVolumeControlsComponent";
import { RtspCameraPlayClient } from "./RtspCameraPlayClient";


export interface Props {
    message?: string,
    recordIdCamera: number,
    application: ClientApplication
}

interface State {
    volume: number,
    soundOn: boolean,
    isPlay: boolean 
}

class RtspCameraViewerComponent extends ComponentBase<Props, State> {

    private readonly video = React.createRef<HTMLVideoElement>()

    private readonly client = this.props.application.props.application.client;

    private readonly recordIdCameraObservable = new rx.Subject<number> ()

    constructor (props: Props){
        super (RtspCameraViewerComponent.name, props)

        this.state = {
            isPlay: true,
            soundOn: true,
            volume: 4
        }

        this.recordIdCameraObservable        
            .switchMap (recordId => rx.Observable.of (recordId)
                .concatMap (() => {
                    const client = new RtspCameraPlayClient (this.props.application.props.application.client.playRtspCamera ());

                    return client.connect (recordId)
                        .flatMap (client.receiveOffer)
                        .flatMap (offer => {
                            
                            const peerConnection = new PeerConnection ({
                                iceTransportPolicy : 'relay',
                                iceServers : [{
                                    urls : offer.turn.url,
                                    username : offer.turn.login,
                                    credential : offer.turn.password
                                }]
                            })
    
                            return rx.Observable.merge (
                                peerConnection.listenTrack ().do (stream => this.video.current.srcObject = stream),
                                peerConnection.bufferIces (),
                                peerConnection.setRemoteOffer (offer.offer)
                                    .do (answer => client.sendAnswer (answer))
                                    .concat (rx.Observable.merge (
                                        peerConnection.listenIces ().do (ice => client.sendIce (ice)),
                                        client.receiveIces ().concatMap (ice => peerConnection.addIce (ice))
                                    ))
                            )
                            .finally (() => peerConnection.close())
                        })
                        .finally (() => client.close)

                })
                .retryWhen (this.logger.rx.retry ("Error playing camera"))
            )
            .takeUntil (this.unmounted)
            .finally (() => console.log ('ONLINE IS STOPPED'))
            .subscribe (this.logger.rx.subscribe ("Error playing camera"))
        
    }

    componentDidMount () {
        this.componentDidUpdate ({})
    }

    componentDidUpdate (prevProps : Partial<Props>) {
        if (prevProps.recordIdCamera != this.props.recordIdCamera && this.props.recordIdCamera != null) {
            this.recordIdCameraObservable.next (this.props.recordIdCamera);
        }
    }    

    private readonly handleVolumeControl = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.persist();

        this.flatState({
            volume: parseInt(event.target.value)
        })
        .takeUntil(this.unmounted)
        .subscribe(this.logger.rx.subscribe(this.handleVolumeControl.name))
    }

    private readonly setSoundOnOff = () => this.flatState(state => ({
        soundOn: !state.soundOn
    }))
    .takeUntil(this.unmounted)
    .subscribe(this.logger.rx.subscribe(this.setSoundOnOff.name))

    private readonly handleFullScreenBtnClick = () => {
        if (!document.fullscreenElement) {
            this.video.current.requestFullscreen();
        }
    }

    private readonly handlePlayPauseBtnClick = () => this.flatState(state => ({
        isPlay: !state.isPlay
    }))
    .takeUntil(this.unmounted)
    .subscribe(this.logger.rx.subscribe(this.handlePlayPauseBtnClick.name))

    private readonly getScreenShot = () => {}

    public readonly render = () => {

        const componentClass = RtspCameraViewerComponent.name;

        const {message} = this.props

        const {isPlay, soundOn, volume} = this.state

        const getMessage = () => {
            return (
                <div className={`${componentClass}__messages`}>
                    <MessagePillComponent type="success" label="онлайн" />
                </div>
            )
        }

        return (
            <div className={componentClass}>
                <video autoPlay ref={this.video}></video>
                <div className={`${componentClass}__controls`}>
                    <PlayerVolumeControlsComponent listener={this.handleVolumeControl} volume={volume} onClick={this.setSoundOnOff} soundOn={soundOn}/>  
                    <GetScreenshotBtnComponent onClick={this.getScreenShot} />       
                    
                </div>
                    <PlayerPlayPauseBtnComponent onClick={this.handlePlayPauseBtnClick} isPlay={isPlay} />
                    <FullScreenBtnComponent onClick={this.handleFullScreenBtnClick} />
                {getMessage()}
            </div>
        );
    }
}

export default withClientApplicationContext(RtspCameraViewerComponent)