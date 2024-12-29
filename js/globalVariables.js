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

const allPlayersTitle = `
Arranges players into groups with or without set goals.
To turn a player into a participant (their name turns black) - select the "Top 10" or "Top 30" group for them.
To turn a participant back into a non-participant (remove their GROUP and GOAL) - click on their name.
Which player belongs to which group and what their goal is - can be found on the #uih-event-rs-signup channel on Discord.
`;
const top10ParticipantsTitle = ``;
const top30ParticipantsTitle = ``;
const noGroupParticipantsTitle = `
Unsung heroes.
`;
const uihGroupsTitle = `
Provides an approximate level of completion for each group.
When the goal is reached (100%), the cell will be colored GREEN.
Actual level of completion may vary from that shown here.
`;
const groupSeatsTitle = `
When all seats in a subgroup are taken, the cell will be colored RED.
When all seats for the entire group are taken, the "Top 10" or "Top 30" cells within the "All Players Table" \nwill become gray and unclickable, preventing the USER from assigning more participants than the group has seats for.
`;