import {FontSource, Sound, ImageSource, Loader} from "excalibur";

// ******************************* Images ***************************************************

export const Resources = {
    StreetBG: new ImageSource("./images/Street_Background.png"),
    StreetFG: new ImageSource("./images/Street_Foreground.png"),
    StreetFountain: new ImageSource("./images/Street_fountain.png"),
    Desk: new ImageSource("./images/Desk.jpg"),
    IDCard: new ImageSource("./images/IDCard.png"),
    Attestation: new ImageSource("./images/Attestation.png"),
    WorkCert: new ImageSource("./images/Work.png"),
    HeartFull: new ImageSource("./images/heart_full.png"),
    HeartEmpty: new ImageSource("./images/heart_empty.png"),
    Tram1: new ImageSource("./images/Tram_L1.png"),
    Tram2: new ImageSource("./images/Tram_L2.png"),
    TramBlack: new ImageSource("./images/Tram_Black.png"),
    EmptyConvocation: new ImageSource("./images/Convocation.png"),
    EmptyTicket: new ImageSource("./images/Ticket.png"),
    EmptyStudentCard: new ImageSource("./images/StudentCard.png"),
    MiniNPCIdle0: new ImageSource("./images/People/People_Idle_0.png"),
    MiniNPCIdle1: new ImageSource("./images/People/People_Idle_1.png"),
    MiniNPCWalk0: new ImageSource("./images/People/People_Walk_0.png"),
    MiniNPCWalk1: new ImageSource("./images/People/People_Walk_1.png"),
    MiniNPCWalk2: new ImageSource("./images/People/People_Walk_2.png"),
    MiniNPCWalk3: new ImageSource("./images/People/People_Walk_3.png"),
    MiniNPCWalk4: new ImageSource("./images/People/People_Walk_4.png"),
    MiniNPCWalk5: new ImageSource("./images/People/People_Walk_5.png"),
    MiniNPCWalk6: new ImageSource("./images/People/People_Walk_6.png"),
    MiniNPCWalk7: new ImageSource("./images/People/People_Walk_7.png"),
    PunishButton: new ImageSource("./images/Button.png"),
    Strava: new ImageSource("./images/Strava.png"),
    Doc: new ImageSource("./images/Doc.png"),
    MiniNPCID: new ImageSource("./images/People/People_ID.png"),
    EmptyWarning: new ImageSource("./images/Warning.png"),
    AmbianceLoop: new Sound("./sounds/VPSVP_Ambiance_Loop.ogg"),
    PeopleStopL: new Sound("./sounds/VPSVP_PeopleStop_L.mp3"),
    PeopleStopR: new Sound("./sounds/VPSVP_PeopleStop_R.mp3"),
    Ammende: new Sound("./sounds/VPSVP_Ammende.ogg"),
    Wrong1: new Sound("./sounds/VPSVP_Wrong_1.ogg"),
    Wrong2: new Sound("./sounds/VPSVP_Wrong_2.ogg"),
    Wrong3: new Sound("./sounds/VPSVP_Wrong_3.ogg"),
    Party: new Sound("./sounds/VPSVP_Musique_Loop.mp3"),
    TramBell1L: new Sound("./sounds/VPSVP_Tram_Bell_1_L.mp3"),
    TramBell1R: new Sound("./sounds/VPSVP_Tram_Bell_1_R.mp3"),
    TramBell2L: new Sound("./sounds/VPSVP_Tram_Bell_2_L.mp3"),
    TramBell2R: new Sound("./sounds/VPSVP_Tram_Bell_2_R.mp3"),
    SheetDown: new Sound("./sounds/VPSVP_Sheet_Down.mp3"),
    CardDown: new Sound("./sounds/VPSVP_Card_Down.mp3"),

} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
    loader.addResource(res);
}


// ******************************* FONTS ***************************************************

const fonts = [
    new FontSource("./fonts/Cavalhatriz.ttf", "Cavalhatriz"),
    new FontSource("./fonts/KiwiSoda.ttf", "KiwiSoda"),
    new FontSource("./fonts/DoubleHomicide.ttf", "DoubleHomicide"),
    new FontSource("./fonts/GrapeSoda.ttf", "GrapeSoda"),
    new FontSource("./fonts/VNPxCopperplate.ttf", "VNPxCopperplate"),
    new FontSource("./fonts/ARCADEPI.ttf", "ARCADEPI"),
]

fonts.forEach(font => font.load());