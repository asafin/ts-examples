import * as React from "react";

export interface Props {
    url: string,
    play: boolean,
    isPlayerStopped: () => void,
    isPlayerStoppedByAudioEnded: () => void,
}

export class SimplePlayerComponent extends React.Component<Props> {

    private readonly player = React.createRef<HTMLAudioElement>()

    constructor(props: Props) {
        super(props);
    }

    componentDidMount = () => {
        this.player.current.play();
    }

    componentDidUpdate = (prevProps: Readonly<Props>): void => {
        if (this.props.url != prevProps.url) {
            this.setPlayerStop();
        }

        if (this.props.play != prevProps.play) {
            if (this.props.play) {
                this.player.current.play()
            }
            else {
                this.player.current.pause()
            }
        }
    }

    private readonly initProgressBar = () => {
        if (this.player.current.currentTime == this.player.current.duration) {
            this.setPlayerStopByAudioEnded();
        }
    }

    private readonly setPlayerStop = () => {
        this.player.current.currentTime = 0;
        this.player.current.pause()
        this.props.isPlayerStopped()
    }

    private readonly setPlayerStopByAudioEnded = () => {
        this.player.current.currentTime = 0;
        this.player.current.pause()
        this.props.isPlayerStoppedByAudioEnded()
    }

    render() {
        const pageClass = "SimplePlayerComponent"
        const {url} = this.props

        return (
            <div className={pageClass} >
                <div className={`${pageClass}-audio`}>
                    <audio autoPlay={false} ref={this.player} onTimeUpdate={this.initProgressBar}>
                        <source src={url} type="audio/mp3"/>
                        <p>Ваш браузер не поддерживает HTML5 аудио.</p>
                    </audio>
                </div>
            </div>
        )
    }
}
