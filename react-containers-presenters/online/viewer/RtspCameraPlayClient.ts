import * as rx from "rxjs/Rx"
import { PlayRtspCameraRequest, PlayRtspCameraResponse } from "@svsai/client-api";
import { WebSocketAdapter } from "./../../../../../codebase/WebSocketAdapter";

export class RtspCameraPlayClient {

    private readonly ws : WebSocketAdapter<PlayRtspCameraRequest,PlayRtspCameraResponse>; 
    private remoteIces : RTCIceCandidateInit [] = []

    constructor (socket : WebSocket) {
        this.ws = new WebSocketAdapter (socket);
    }

    public readonly close = () => this.ws.close ()

    public readonly sendAnswer = (answer : string) => this.ws.send ({webRtcRequest : {answer}})
    
    public readonly sendIce = (ice : RTCIceCandidateInit) => this.ws.send ({webRtcRequest : {ice}})

    public readonly connect = (recordIdCamera : number) =>  rx.Observable.merge (
        this.ws.getErrorObservable (),
        this.ws.getCloseObservable ().flatMap (() => rx.Observable.throwError ("Connection is closed")),
        this.bufferIces (),
        this.ws.connect ()
    )
    .do (() => this.ws.send ({
        recordIdCamera : recordIdCamera.toString ()
    }))

    public readonly receiveOffer = () => this.receiveSuccessResponse ()
        .filter (response => response.success.webRtcResponse.offer != null)
        .map (response => response.success.webRtcResponse.offer)
    
    public readonly receiveIces = () => rx.Observable.from (this.remoteIces)
        .concat (this.doReceiveIces ())

    public readonly receiveSuccessResponse = () => this.ws.getResponseObservable ()
        .filter (response => response.success != null)

    private readonly bufferIces = () => this.doReceiveIces ()
        .do (ice => this.remoteIces.push (ice))
        .ignoreElements ()
    
    public readonly doReceiveIces = () => this.receiveSuccessResponse ()
        .filter (response => response.success.webRtcResponse.ice != null)
        .map (response => response.success.webRtcResponse.ice)

}