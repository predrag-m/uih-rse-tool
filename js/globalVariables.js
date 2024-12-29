///
/// GLOBAL VARIABLES
///
const fadeInEffect = "fade-in .5s";
const pulsateEffect = "pulsate 1.25s infinite alternate";

const firstRSERunID = 32_649;
const lastRSERunID = 33_865;
const top10GoalSUM = 13_000_000;
const top30GoalSUM = 4_500_000;

let top10SubgroupList = null;
let top30SubgroupList = null;
let playersList = null;
let uihGroupList = null;

let group10Points = null;
let group30Points = null;

let participantsList = null;
let group10ParticipantsList = null;
let group30ParticipantsList = null;

/* backup variables - in case user accidently deletes participants */
let playersListCOPY = [];
let participantsListCOPY = [];
let top10SubgroupListCOPY = [];
let top30SubgroupListCOPY = [];
let group10ParticipantsListCOPY = [];
let group30ParticipantsListCOPY = [];