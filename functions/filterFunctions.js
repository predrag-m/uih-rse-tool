///
/// all players --> only players whos group !== "", which means they are participating in the RS event
/// Used inside "loadAllData()"
///
function onlyParticipants(participant) {
    if (participant.group !== "" && participant.goal !== 0) return participant;
}
///
/// all players --> only group 10 participants or group 30 participants
///
function byTheirGroup(participant) {
    if (participant.group == this) return participant;
}
///
/// all participants (or all players) --> only those whose CURRENT POINTS are equal or exceed their GOAL
/// Used inside "renderParticipantsTable()"
/// Maybe used inside loadAllData() ?; currently it isn't
///
function onlyWithCompletedGoal(participant) {
    if (participant.goal - participant.currentPoints <= 0) return participant;
}
///
///
///
function onlyWithPointsAndWithoutGroup(participant) {
    if (participant.currentPoints !== 0 && participant.goal === 0 && participant.group === "") return participant;
}


///
/// Entire RS HISTORY LIST (~14 MB) --> list of only specific runs that happened during a single RS event
/// Requires starting ID and ending ID
/// In the case the event is still running - the ending ID is still unknown - in that case the value of ending ID is hardcoded to some VERY big number
/// Used inside "index.html" (constant called "rsHistoryList")
///
function onlyEventRuns(run) {
    if (firstRSERunID <= run.id && run.id <= lastRSERunID) return run;
}
///
/// onlyEventRunsList --> onlyEventRunsList for a single participant
///
function onlyEventRunsOfSpecificPlayer(RSERun) {
    // this = player object
    for (let user of RSERun.users) {
        if (user.id == this.id) return RSERun;
    }
}
///
///
///