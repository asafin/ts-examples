import * as React from "react";
import {PlayBackSpeed} from "../../pages/callsList/callItem/CallItemComponent";

export interface Props {
    url: string,
    conversationPosition: number,
    play: boolean,
    playBackSpeed: PlayBackSpeed
    setPlayerPlay: (play: boolean) => void,
    isPlayerStopped: () => void
}

export class PlayerComponent extends React.Component<Props> {

    private readonly player = React.createRef<HTMLAudioElement>()
    private readonly progress = React.createRef<HTMLProgressElement>()

    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.player.current.playbackRate = this.props.playBackSpeed
    }

    componentDidUpdate = (prevProps: Readonly<Props>): void => {
        if (this.props.url != prevProps.url) {
            this.setPlayerStop();
            this.props.setPlayerPlay(false)
        }

        if (this.props.conversationPosition != prevProps.conversationPosition) {
            this.player.current.currentTime = this.props.conversationPosition;
            this.progress.current.value = this.props.conversationPosition / this.player.current.duration;
            this.props.setPlayerPlay(true)
            this.player.current.play()
        }

        if (this.props.play != prevProps.play) {
            if (this.props.play) {
                this.player.current.play()
            }
            else {
                this.player.current.pause()
            }
        }

        if (this.props.playBackSpeed != prevProps.playBackSpeed) {
            this.player.current.playbackRate = this.props.playBackSpeed
        }
    }

    private readonly initProgressBar = () => {
        this.progress.current.value = this.player.current.currentTime / this.player.current.duration
        let play: boolean = this.props.play
        if (this.player.current.currentTime == this.player.current.duration) {
            play = false
            this.setPlayerStop();
        }

        this.props.setPlayerPlay(play)
    }

    private readonly setPlayerStop = () => {
        this.progress.current.value = 0
        this.player.current.currentTime = 0;
        this.player.current.pause()
        this.props.isPlayerStopped()
    }

    private readonly seek = (event: React.MouseEvent<HTMLProgressElement>) => {
        event.persist()

        let percent = event.nativeEvent.offsetX / this.progress.current.getBoundingClientRect().width;
        this.player.current.currentTime = percent * this.player.current.duration;
        this.progress.current.value = percent;
    }

    render() {
        const pageClass = "PlayerComponent"

        const styles = {width: '100%', marginBottom: 20}

        const {url} = this.props

        return (
            <div className={pageClass} >
                <div className={`${pageClass}-audio`}>
                    <audio autoPlay={false} ref={this.player} onTimeUpdate={this.initProgressBar}>
                        <source src={url} type="audio/mp3"/>
                        <p>Ваш браузер не поддерживает HTML5 аудио.</p>
                    </audio>
                </div>
                <div className={`${pageClass}-progressBar`}>
                    <progress style={styles} value="0" max="1" ref={this.progress} onClick={this.seek}/>
                </div>
            </div>
        )
    }
}
