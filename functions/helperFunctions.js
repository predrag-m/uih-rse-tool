///
/// When user clicks on one of the navbar "buttons" <MAIN> element should display the correct <table> element and hide the rest
/// Used inside "renderNavBar()"
///
function hideCertainNavBarHTMLElements(...HTMLelements) {
    for (let element of HTMLelements) element.className = "";
};
///
/// Disables "Top 10" or "Top 30" btns inside ALL PLAYERS table - depending on the number of remaining seats
/// Used inside "renderPlayersTable()" - when all seats pf a certain group are taken, USER is then restricted to add more players to that group
///
function disableGroupBtnDependingOnNumberOfSeatsRemaining(player, groupName, btnHTMLElement) {
    let numberOfSeatsInGroup = howManySeatsAreInGroup(groupName);
    let numberOfParticipantsInGroup = howManyPlayersAreInGroup(groupName);
    let seatsLeftInGroup = numberOfSeatsInGroup - numberOfParticipantsInGroup;
    /* TITLE */
    btnHTMLElement.title = `${seatsLeftInGroup} seats remain in the ${groupName.toUpperCase()} group.`;
    if (seatsLeftInGroup === 1) btnHTMLElement.title = `${seatsLeftInGroup} seat remains in the ${groupName.toUpperCase()} group.`;
    /* CLASSES */
    if (groupName === "top 10") btnHTMLElement.className = "top-10-group";
    if (groupName === "top 30") btnHTMLElement.className = "top-30-group";
    if (player.group === groupName) {
        btnHTMLElement.classList.add("selected");
        btnHTMLElement.classList.add("disabled");
        btnHTMLElement.disabled = true;
    };
    if (numberOfParticipantsInGroup >= numberOfSeatsInGroup && player.group !== groupName) {
        btnHTMLElement.classList.add("disabled");
        btnHTMLElement.disabled = true;
    };
}
///
/// Creates cells that have "top-10-amount"/"top-30-amount" on them, and listens to "click" event
/// Used inside "renderPlayersTable()"
///
function createGoalCells(player, topXSubgroupList, trHTMLElement) {
    let groupName = topXSubgroupList[0].groupName;
    for (let subgroup of topXSubgroupList) {
        const tdHTMLAmountTop = document.createElement("td");
        const btnHTMLTopAmount = document.createElement("button");
        trHTMLElement.append(tdHTMLAmountTop);
        tdHTMLAmountTop.append(btnHTMLTopAmount);
        /* INNER TEXT */
        btnHTMLTopAmount.innerText = subgroup.name;
        /* CLASSES */
        if (groupName === "top 10") btnHTMLTopAmount.className = "top-10-amount";
        if (groupName === "top 30") btnHTMLTopAmount.className = "top-30-amount";
        if (player.group !== groupName) {
            btnHTMLTopAmount.classList.add("disabled");
            btnHTMLTopAmount.disabled = true;
        }
        if (subgroup.seatsLeft === 0 && player.goal === subgroup.amount && player.group === groupName) {
            btnHTMLTopAmount.classList.add("selected");
            btnHTMLTopAmount.classList.add("disabled");
            btnHTMLTopAmount.disabled = true;
        }
        if (subgroup.seatsLeft === 0 && player.goal !== subgroup.amount) {
            btnHTMLTopAmount.classList.add("disabled");
            btnHTMLTopAmount.disabled = true;
        }
        if (subgroup.seatsLeft > 0 && player.goal === subgroup.amount && player.group === groupName) {
            btnHTMLTopAmount.classList.add("selected");
            btnHTMLTopAmount.classList.add("disabled");
        }
        /* LISTEN: "top-10-amount" and "top-30-amount" buttons */
        btnHTMLTopAmount.addEventListener("click", () => {
            let previousAmount = player.goal;
            if (subgroup.seatsLeft > 0) updatePlayerAndtopXSubgroupList(player, subgroup, previousAmount);
            saveToLS();
            renderPlayersTable(mainEl, false);
            if (groupName === "top 10") renderSeatsTop10or30Table(remainingSeatsTop10El, groupName);
            if (groupName === "top 30") renderSeatsTop10or30Table(remainingSeatsTop30El, groupName);
        });
    }
}
///
/// Increases seat of the correct subgroup (if player possesses BOTH "group" and "goal")
/// Used inside "renderPlayersTable()" - when participant leaves the current subgroup
///
function increaseSeatOfCorrectSubgroup(player) {
    if (player.group !== "" && player.goal !== 0) increaseSeats(findPlayerSubgroup(player));
}
///
/// INCREASE and DECREASE seats
/// Used inside "renderPlayersTable()" and helper function "updatePlayerAndtopXSubgroupList()"
///
function increaseSeats(subgroup) {
    if (subgroup.seatsLeft < subgroup.maxSeats) subgroup.seatsLeft++;
}
function decreaseSeats(subgroup) {
    if (subgroup.seatsLeft > 0) subgroup.seatsLeft--;
}
///
/// Resets everything to NON-PARTICIPANT except player.currentPoints
/// Used inside "renderPlayersTable()" - when USER clicks on "Top 10" / "Top 30" / "Player" cells
///
function resetPlayer(player, groupName = "") {
    player.goal = 0;
    player.group = groupName;
    player.remainingPoints = 0;
    player.surplusPoints = 0;
}
///
/// When USER is on the PLAYERS TABLE "page" it:
/// - refreshes the ALL PLAYERS TABLE
/// - renders SEATS tables
///
/// Used inside "renderPlayersTable()"
///
function refreshAllPlayersPage() {
    // loadAllData();
    // saveToLS();
    renderPlayersTable(mainEl, false);
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-10"), "top 10");
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-30"), "top 30");
    renderUIHGroupsTable(document.getElementById("uih-groups"));    // new 1
}
///
/// Saves all the data to Local Storage
/// Used inside HELPER FUNCTION called "refreshAllPlayersPage()"
///
function saveToLS() {
    localStorage.setItem("top10SubgroupListLS", JSON.stringify(top10SubgroupList));
    localStorage.setItem("top30SubgroupListLS", JSON.stringify(top30SubgroupList));
    localStorage.setItem("playersListLS", JSON.stringify(playersList));
    localStorage.setItem("uihGroupListLS", JSON.stringify(uihGroupList));
}
///
/// Makes a duplicate of each key:value that is inside the Local Storage
///
function createBackup() {
    localStorage.setItem("top10SubgroupListLSBackup", JSON.stringify(top10SubgroupList));
    localStorage.setItem("top30SubgroupListLSBackup", JSON.stringify(top30SubgroupList));
    localStorage.setItem("playersListLSBackup", JSON.stringify(playersList));
    localStorage.setItem("uihGroupListLSBackup", JSON.stringify(uihGroupList));
}
///
/// Loads all the data first from LS and in case it fails, loads from "blueprints" folder, and puts that data inside the relevant variables
///
function loadAllData() {
    /* From Local Storage */
    top10SubgroupList = JSON.parse(localStorage.getItem("top10SubgroupListLS"));
    top30SubgroupList = JSON.parse(localStorage.getItem("top30SubgroupListLS"));
    playersList = JSON.parse(localStorage.getItem("playersListLS"));
    uihGroupList = JSON.parse(localStorage.getItem("uihGroupListLS"));
    /* From "blueprints" folder */
    if (!top10SubgroupList && !top30SubgroupList && !playersList && !uihGroupList) {
        top10SubgroupList = top10SubgroupListBP;
        top30SubgroupList = top30SubgroupListBP;
        playersList = playersListBP;
        assignCurrentPointsToPlayersList(); // copies values from JSON into playersList
        uihGroupList = uihGroupListBP;
    }
    /* Populate other lists: */
    participantsList = playersList.filter(onlyParticipants);
    group10ParticipantsList = participantsList.filter(byTheirGroup, "top 10");
    group30ParticipantsList = participantsList.filter(byTheirGroup, "top 30");
}
///
/// Creates DYNAMIC row for table called "renderSeatsTop10or30Table"
/// Used inside "renderSeatsTop10or30Table()"
///
function generateRowForSeatsTop10or30Table(tBodyHTML, subgroup) {
    const trHTMLDynamic = document.createElement("tr");
    const tdHTMLGroup = document.createElement("td");
    const tdHTMLSeats = document.createElement("td");
    tBodyHTML.append(trHTMLDynamic);
    trHTMLDynamic.append(tdHTMLGroup);
    trHTMLDynamic.append(tdHTMLSeats);
    /* Inner Text */
    let seatsTaken = subgroup.maxSeats - subgroup.seatsLeft;
    tdHTMLGroup.innerText = subgroup.name;
    tdHTMLSeats.innerText = `${seatsTaken} / ${subgroup.maxSeats}`;
    /* CLASSES */
    if (seatsTaken === subgroup.maxSeats) tdHTMLSeats.className = "seats-available-none";
}
///
/// When participant is missing a GOAL - their entire row located inside PARTICIPANTS TABLE pulsates, signaling to USER something is a miss
/// Used inside "renderParticipantsTable()"
///
function makeTrHTMLPulsate(trHTML, tdHTML, participantName) {
    trHTML.style.color = "red";
    trHTML.style.animation = pulsateEffect;
    trHTML.title = `The GOAL for ${participantName} has NOT been set! \nIt can be set inside the ALL PLAYERS table.`;
    trHTML.style.cursor = "help";
    tdHTML.innerText = 0;
}
///
/// creates a DEFAULT first row for table PARTICIPANTS
/// Used inside "renderParticipantsTable()"
///
function createHeaderRowForParticipantsTable(status) {
    /* create */
    const trHeader = document.createElement("tr");
    const thGoal = document.createElement("th");
    const thParticipantName = document.createElement("th");
    const thRemainingOrSurplusP = document.createElement("th");
    const thCurrentP = document.createElement("th");
    trHeader.append(thGoal);
    trHeader.append(thParticipantName);
    trHeader.append(thRemainingOrSurplusP);
    trHeader.append(thCurrentP);
    /* Default text for th elements of the 1st row */
    const textGoal = "GOAL";
    const textParticipantName = "PARTICIPANT";
    const textRemainingP = "REMAINING P";
    const textSurplusP = "SURPLUS P";
    const textNoStatus = "GROUP NOT ASSIGNED";
    const textCurrentP = "CURRENT P";
    /* Inner Text */
    thGoal.innerHTML = textGoal;
    thParticipantName.innerHTML = textParticipantName + "  &or;";
    if (status === "uncompleted") thRemainingOrSurplusP.innerHTML = textRemainingP;
    if (status === "completed") thRemainingOrSurplusP.innerHTML = textSurplusP;
    if (status === "") thRemainingOrSurplusP.innerHTML = textNoStatus;

    thCurrentP.innerHTML = textCurrentP;
    /* CSS classes */
    thParticipantName.className = "participant-name";
    /* must return HTML ROW */
    return trHeader;
}
///
/// Turns numbers into specific strings
/// (example 1: 13_000_000 --> "13 m")
/// (example 2: 4_500_000 --> "4.5 m")
///
function convertGoalNumToText(goalNum) {
    return (goalNum / 1_000_000).toString().concat(" m");
}
///
/// Current points that can be below the GOAL or above it - are turned into PERCENTAGES
/// goal           ..... 100%       
/// currentPoints  ........ X     -->      X = currentPoints * 100 / goal
///
function convertCurrentPointsToPercentages(group) {
    return `${(group.currentPoints * 100 / group.goal).toFixed(1)} %`;
}
///
/// Used inside "renderParticipantsTable()"
///
function convertRemainingOrSurplusPToPercentage(participant) {
    let result = participant.goal - participant.currentPoints;
    let value = null;
    if (result > 0) value = participant.remainingPoints * 100 / participant.goal;
    if (result <= 0) value = participant.surplusPoints * 100 / participant.goal;
    /* FAILSAFE: In case user didn't select the GOAL for a participant (all players table) */
    if (participant.goal === 0) value = 0;
    return `${value.toFixed(1)}%`;
}
///
/// - Finds previous subgroup (750k or 500k or ...) and increases "seatsLeft" by 1
/// - finds new subgroup and decreases "seatsLeft"
/// - player.goal = subgroup.amount
/// Used inside helper function "createGoalCells()"
///
function updatePlayerAndtopXSubgroupList(player, subgroup, previousAmount) {
    let topXYSubgroupList = null;
    let previousSubgroup = null;
    if (subgroup.groupName === "top 10") topXYSubgroupList = top10SubgroupList;
    if (subgroup.groupName === "top 30") topXYSubgroupList = top30SubgroupList;
    for (let element of topXYSubgroupList) {
        if (element.amount === previousAmount) previousSubgroup = element;
    }
    if (previousSubgroup) increaseSeats(previousSubgroup);
    decreaseSeats(subgroup);
    player.goal = subgroup.amount;
    /* recalculating remainingPoints and surplusPoints */
    if (player.goal > player.currentPoints) {
        player.remainingPoints = player.goal - player.currentPoints;
        player.surplusPoints = 0;
    } else {
        player.remainingPoints = 0;
        player.surplusPoints = player.currentPoints - player.goal;
    }
};
///
/// player.group - can have one of these 3 values: "top 10" or "top 30" or ""
/// Used inside helper function "increaseSeatOfCorrectSubgroup()"
///
function findPlayerSubgroup(player) {
    let targetSubgroupList = null;
    if (player.group === "top 10") targetSubgroupList = top10SubgroupList;
    if (player.group === "top 30") targetSubgroupList = top30SubgroupList;
    for (let subgroup of targetSubgroupList) {
        if (subgroup.amount === player.goal) return subgroup;
    }
}
///
/// Used inside "index.html" when user wants with one press of the button to remove "group" and "goal" values for every participant (turn them into NONparticipants)
///
function resetAllParticipantsValues() {
    for (let participant of playersList) {
        participant.goal = 0;
        participant.group = "";
    }
}
///
/// Used inside "index.html" when user wants with one press of the button to make all seats available
///
function resetAllSeats() {
    resetXYSeats(top10SubgroupList);
    resetXYSeats(top30SubgroupList);
}
///
/// Sets max amount of seats available for single group (10 or 30)
/// "XY" represents "group10" or "group30"
///
function resetXYSeats(subgroupList) {
    for (let subgroup of subgroupList) {
        do {
            increaseSeats(subgroup);
        }
        while (subgroup.seatsLeft < subgroup.maxSeats);
    }
}
///
///
///
function resetUIHGroups() {
    for (let group of uihGroupList) {
        group.currentPoints = 0;
        group.remainingPoints = 0;
        group.surplusPoints = 0;
    }
}
///
///
///
function loadBackup() {
    if (JSON.parse(localStorage.getItem("top10SubgroupListLSBackup")) === null || JSON.parse(localStorage.getItem("top10SubgroupListLSBackup")) === null) return;
    top10SubgroupList = JSON.parse(localStorage.getItem("top10SubgroupListLSBackup"));
    top30SubgroupList = JSON.parse(localStorage.getItem("top30SubgroupListLSBackup"));
    playersList = JSON.parse(localStorage.getItem("playersListLSBackup"));
    uihGroupList = JSON.parse(localStorage.getItem("uihGroupListLSBackup"));
    /* From "blueprints" folder */
    if (!top10SubgroupList && !top30SubgroupList && !playersList && !uihGroupList) {
        top10SubgroupList = top10SubgroupListBP;
        top30SubgroupList = top30SubgroupListBP;
        playersList = playersListBP;
        uihGroupList = uihGroupListBP;
    }
    /* Populate other lists: */
    participantsList = playersList.filter(onlyParticipants);
    group10ParticipantsList = participantsList.filter(byTheirGroup, "top 10");
    group30ParticipantsList = participantsList.filter(byTheirGroup, "top 30");
}
///
/// Button inside ASIDE html element
///
function resetParticipants() {
    /* FAILSAFE */
    let counter = 0;
    for (let player of playersList) {
        // if (player.goal === 0) counter++;
        if (player.goal === 0 && player.group === "") counter++;
    }
    if (counter === playersList.length) return;

    createBackup();
    resetAllParticipantsValues();
    resetAllSeats();
    resetUIHGroups();   // new 1

    saveToLS();
    renderPlayersTable(mainEl, true);
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-10"), "top 10", true);
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-30"), "top 30", true);
    renderUIHGroupsTable(document.getElementById("uih-groups"), true);    // new 1
}
///
/// Button inside ASIDE html element
/// Execute undo ONLY when entire "playersList" has both GOAL = 0 and GROUP = ""
///
function undoResetParticipants() {
    /* FAILSAFE */
    let counter = 0;
    for (let player of playersList) {
        if (player.goal === 0 && player.group === "") counter++;
    }
    if (counter !== playersList.length) return;
    /* copy of the original code */
    // let counter = 0;
    // for (let player of playersList) {
    //     if (player.goal !== 0) counter++;
    // }
    // if (counter > 0 && counter !== playersList.length) return;

    loadBackup();

    saveToLS(); // here
    renderPlayersTable(mainEl, true);
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-10"), "top 10", true);
    renderSeatsTop10or30Table(document.getElementById("remaining-seats-top-30"), "top 30", true);
    renderUIHGroupsTable(document.getElementById("uih-groups"), true);    // new 1
}
///
/// Used when there are NO keys inside LocalStorage
/// It populates "playersList" coming from folder "blueprints" with player's currentPoints from parsed JSON file
///
function getPlayerTotalPoints(playerRSEHistory) {
    let totalPoints = 0;
    for (let rseRun of playerRSEHistory) {
        if (rseRun.players == 4) totalPoints += Math.floor(rseRun.points / 4);
        if (rseRun.players == 3) totalPoints += Math.floor(rseRun.points / 3);
        if (rseRun.players == 2) totalPoints += Math.floor(rseRun.points / 2);
        if (rseRun.players == 1) totalPoints += rseRun.points;
    }
    return totalPoints;
}
///
/// Creates dynamic rows for PARTICIPANT table and appends it to it
///
function renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status) {
    tBodyHTML.innerHTML = ""
    for (let participant of groupXYParticipantsList) {
        /* Create */
        const trHTML = document.createElement("tr");
        const tdHTMLParticipantName = document.createElement("td");
        const tdHTMLGoal = document.createElement("td");
        const tdHTMLRemainingOrSurplusP = document.createElement("td");
        const tdHTMLCurrentP = document.createElement("td");
        /* Append */
        tBodyHTML.append(trHTML);
        trHTML.append(tdHTMLGoal);
        trHTML.append(tdHTMLParticipantName);
        trHTML.append(tdHTMLRemainingOrSurplusP);
        trHTML.append(tdHTMLCurrentP);
        /* Inner Text */
        tdHTMLParticipantName.innerText = participant.name;
        tdHTMLGoal.innerText = (participant.goal).toString().slice(0, 3).concat(" k");
        if (status === "uncompleted") tdHTMLRemainingOrSurplusP.innerText = `${participant.remainingPoints.toLocaleString()} (${convertRemainingOrSurplusPToPercentage(participant)})`;
        if (status === "completed") tdHTMLRemainingOrSurplusP.innerText = `${participant.surplusPoints.toLocaleString()} (${convertRemainingOrSurplusPToPercentage(participant)})`;
        tdHTMLCurrentP.innerText = participant.currentPoints.toLocaleString();
        /* If PLAYER doesn't have their GOAL set in */
        if (participant.goal === 0) makeTrHTMLPulsate(trHTML, tdHTMLRemainingOrSurplusP, participant.name);
    }
}
///
/// Goes through "rsHistoryList" (which contains only Event Runs) in order to see the amount of points each participant has made
/// It then copies those points into each player's "currentPoints" property (player is an object inside "playersList")
///
function assignCurrentPointsToPlayersList() {
    for (let player of playersList) {
        let playerRunsList = rsHistoryList.filter(onlyEventRunsOfSpecificPlayer, player);
        playerCurrentPoints = getPlayerTotalPoints(playerRunsList);
        player.currentPoints = playerCurrentPoints;
    }
}
///
/// Tried to update uihGroupList's currentPoints by going through playersList and adding currentPoints of each player that also has a group
/// So far it seems I don't need this but maybe I will need it on first program load (remains to be seen)
/// Used in "index.html" when starting program
///
// function updateUIHGroupList() {
//     let group10 = null;
//     let group30 = null;
//     for (let group of uihGroupList) {
//         if (group.name === "top 10") group10 = group;
//         if (group.name === "top 30") group30 = group;
//     }
//     /// go through playersList and gather all player.currentPoints of the same group - and that sum write down into "uihGroupList" (rephrase this comment better)
//     for (let player of playersList) {
//         if (player.group === "top 10") group10.currentPoints += player.currentPoints;
//         if (player.group === "top 30") group30.currentPoints += player.currentPoints
//     }
// };
// fu
function recalculateRemainingOrSurplusPOfTheGroup(group) {
    if (group.currentPoints >= group.goal) {
        // goal has been completed
        group.remainingPoints = 0;
        group.surplusPoints = group.currentPoints - group.goal;
    } else {
        // goal has NOT yet been completed
        group.surplusPoints = 0;
        group.remainingPoints = group.goal - group.currentPoints;
    }
}
///
/// When user changes certain player's group and or goal - this manages total amount of current points of specific UIH group (10 or 30)
/// "previousGroup" is a string and can have one of 3 values:
/// - "top 10"
/// - "top 30"
/// - ""        (empty string)
///
function addOrRemoveParticipantCurrentPointsToCorrectUIHGroup(player, previousGroup = null) {
    let currentGroup = player.group;
    /// find previous group object - subtract
    /// find current group object - add
    for (let group of uihGroupList) {
        /*
        1. Non-participant becomes participant:
            previousGroup:      ""              or          previousGroup:      ""
            currentGroup:       "top 10"                    currentGroup:       "top 30"
        */
        if (previousGroup === "" && currentGroup !== "") {
            // if (group.name === previousGroup) { group.currentPoints -= player.currentPoints }
            if (group.name === currentGroup) { group.currentPoints += player.currentPoints }
        }
        /*
            2. Participant becomes non-participant:
            previousGroup:      "top 10"        or          previousGroup:      "top 30"
            currentGroup:       ""                          currentGroup:       ""
        */
       if (previousGroup !== "" && currentGroup === "") {
            if (group.name === previousGroup) { group.currentPoints -= player.currentPoints }
            // if (group.name === currentGroup) { group.currentPoints += player.currentPoints }
        }
        /*
        3. Participant changes group:
        previousGroup:      "top 10"        or          previousGroup:      "top 30"
        currentGroup:       "top 30"                    currentGroup:       "top 10"
        */
       if (previousGroup !== "" && currentGroup !== "") {
           if (group.name === previousGroup) { group.currentPoints -= player.currentPoints }
           if (group.name === currentGroup) { group.currentPoints += player.currentPoints }
        }
        /*
            4. For when we need to update the uihGroupList with playersList (on page load):
            previousGroup:      ""              or          previousGroup:      ""
            currentGroup:       "top 10"                    currentGroup:       "top 30"
        */
    //    if (!previousGroup) {
 
    //    }
        /// recalculate remainingPoints and surplusPoints for UIH groups
        recalculateRemainingOrSurplusPOfTheGroup(group);
    }


    /// renderUIHGroupTable
}
///
/// Used inside "updateUIHGroup()"
///
function getGroupPoints(group) {
    if (group.name === "top 10") {
        return group10ParticipantsList.reduce((currentTotal, participant) => {
            return currentTotal + participant.currentPoints;
        }, 0);
    }
    if (group.name === "top 30") {
        return group30ParticipantsList.reduce((currentTotal, participant) => {
            return currentTotal + participant.currentPoints;
        }, 0);
    }
}
///
/// Used inside "disableGroupBtnDependingOnNumberOfSeatsRemaining()"
///
function howManyPlayersAreInGroup(groupName) {
    let count = 0;
    for (let player of playersList) {
        if (player.group === groupName) count++;
    }
    return count;
}
///
/// Used inside "disableGroupBtnDependingOnNumberOfSeatsRemaining()"
///
function howManySeatsAreInGroup(groupName) {
    if (groupName === "top 10") {
        return top10SubgroupList.reduce((total, subgroup) => { return total + subgroup.maxSeats }, 0);
    }
    if (groupName === "top 30") {
        return top30SubgroupList.reduce((total, subgroup) => { return total + subgroup.maxSeats }, 0);
    }
}