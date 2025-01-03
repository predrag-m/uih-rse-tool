///
/// NAVIGATION BAR
///
function renderNavBar(parentHTML) {
    parentHTML.innerHTML = "";
    /* Create */
    const ulHTML = document.createElement("ul");
    const liHTMLAllPlayers = document.createElement("li");
    const liHTMLTop10Participants = document.createElement("li");
    const liHTMLTop30Participants = document.createElement("li");
    const liHTMLNoGroupParticipants = document.createElement("li");
    const liHTMLUIHGroups = document.createElement("li");
    /* Create */
    const aHTMLAllPlayers = document.createElement("a");
    const aHTMLTop10Participants = document.createElement("a");
    const aHTMLTop30Participants = document.createElement("a");
    const aHTMLNoGroupParticipants = document.createElement("a");
    const aHTMLUIHGroups = document.createElement("a");
    /* Append */
    parentHTML.append(ulHTML);
    ulHTML.append(liHTMLAllPlayers);
    ulHTML.append(liHTMLTop10Participants);
    ulHTML.append(liHTMLTop30Participants);
    ulHTML.append(liHTMLNoGroupParticipants);
    ulHTML.append(liHTMLUIHGroups);
    /* Append */
    liHTMLAllPlayers.append(aHTMLAllPlayers);
    liHTMLTop10Participants.append(aHTMLTop10Participants);
    liHTMLTop30Participants.append(aHTMLTop30Participants);
    liHTMLNoGroupParticipants.append(aHTMLNoGroupParticipants);
    liHTMLUIHGroups.append(aHTMLUIHGroups);
    /* <a> href */
    aHTMLAllPlayers.href = "#";
    aHTMLTop10Participants.href = "#";
    aHTMLTop30Participants.href = "#";
    aHTMLNoGroupParticipants.href = "#";
    aHTMLUIHGroups.href = "#";
    /* Inner Text */
    aHTMLAllPlayers.innerText = "> All Players";
    aHTMLTop10Participants.innerText = "> Top 10 Participants";
    aHTMLTop30Participants.innerText = "> Top 30 Participants";
    aHTMLNoGroupParticipants.innerText = "> No Group Participants";
    aHTMLUIHGroups.innerText = "> UIH Groups";
    /* Title */
    liHTMLAllPlayers.title = allPlayersTitle;
    liHTMLTop10Participants.title = top10ParticipantsTitle;
    liHTMLTop30Participants.title = top30ParticipantsTitle;
    liHTMLNoGroupParticipants.title = noGroupParticipantsTitle;
    liHTMLUIHGroups.title = uihGroupsTitle;
    /* CSS classes */
    aHTMLAllPlayers.className = "active";
    /* CLICK events */
    aHTMLAllPlayers.addEventListener("click", () => {
        renderPlayersTable(mainEl, true);
        aHTMLAllPlayers.className = "active";
        hideCertainNavBarHTMLElements(aHTMLTop10Participants, aHTMLTop30Participants, aHTMLNoGroupParticipants, aHTMLUIHGroups);
    });
    aHTMLTop10Participants.addEventListener("click", () => {
        renderParticipantsTables(mainEl, "top 10", true);
        aHTMLTop10Participants.className = "active";
        hideCertainNavBarHTMLElements(aHTMLAllPlayers, aHTMLTop30Participants, aHTMLNoGroupParticipants, aHTMLUIHGroups);
    });
    aHTMLTop30Participants.addEventListener("click", () => {
        renderParticipantsTables(mainEl, "top 30", true);
        aHTMLTop30Participants.className = "active";
        hideCertainNavBarHTMLElements(aHTMLAllPlayers, aHTMLTop10Participants, aHTMLNoGroupParticipants, aHTMLUIHGroups);
    });
    aHTMLNoGroupParticipants.addEventListener("click", () => {
        renderParticipantsTables(mainEl, "", true);
        aHTMLNoGroupParticipants.className = "active";
        hideCertainNavBarHTMLElements(aHTMLAllPlayers, aHTMLTop10Participants, aHTMLTop30Participants, aHTMLUIHGroups);
    });
    aHTMLUIHGroups.addEventListener("click", () => {
        renderUIHGroupsTable(mainEl, true);
        aHTMLUIHGroups.className = "active";
        hideCertainNavBarHTMLElements(aHTMLAllPlayers, aHTMLTop10Participants, aHTMLTop30Participants, aHTMLNoGroupParticipants);
    });
}
///
/// RESET PARTICIPANTS / UNDO RESET buttons
///
function renderResetAndUndoResetBtns(parentHTML) {
    parentHTML.innerHTML = "";
    const btnHTMLResetParticipants = document.createElement("button");
    const btnHTMLUndoResetParticipants = document.createElement("button");
    parentHTML.append(btnHTMLResetParticipants);
    parentHTML.append(btnHTMLUndoResetParticipants);
    /* ATTRIBUTES */
    btnHTMLResetParticipants.id = "reset-players-list";
    btnHTMLUndoResetParticipants.id = "undo-reset-players-list";
    btnHTMLResetParticipants.title = resetParticipantsTitle;
    btnHTMLUndoResetParticipants.title = undoResetParticipantsTitle;
    btnHTMLResetParticipants.innerText = "Reset participants";
    btnHTMLUndoResetParticipants.innerText = "Undo";
    /* CLICK events */
    btnHTMLResetParticipants.addEventListener("click", resetParticipants);
    btnHTMLUndoResetParticipants.addEventListener("click", undoResetParticipants);
}
///
/// IMPORT latest Local Storage Data
///
function renderImportLSBtn(parentHTML) {
    parentHTML.innerHTML = "";
    const btnHTMLImportLatestParticipantDistribution = document.createElement("button");
    parentHTML.append(btnHTMLImportLatestParticipantDistribution);
    /* ATTRIBUTES */
    btnHTMLImportLatestParticipantDistribution.id = "import-participants-distribution";
    btnHTMLImportLatestParticipantDistribution.title = importLatestParticipantDistributionTitle;
    btnHTMLImportLatestParticipantDistribution.innerText = "Import RS Signup List";
    // btnHTMLImportLatestParticipantDistribution.innerText = "Import Local Storage";
    /* CLICK events */
    btnHTMLImportLatestParticipantDistribution.addEventListener("click", () => {
        Object.keys(data).forEach(k => localStorage.setItem(k, data[k]));
        location.reload();
    });
}
///
/// ALL PLAYERS
///
function renderPlayersTable(parentHTML, fadeInBoolean = false) {
    parentHTML.innerHTML = "";
    /* Create */
    const tableHTML = document.createElement("table");
    const trHTMLHeader = document.createElement("tr");
    const thHTMLGroup = document.createElement("th");
    const thHTMLPlayer = document.createElement("th");
    const thHTMLGoal10 = document.createElement("th");
    const thHTMLGoal30 = document.createElement("th");
    /* Append */
    parentHTML.append(tableHTML);
    tableHTML.append(trHTMLHeader);
    trHTMLHeader.append(thHTMLGroup);
    trHTMLHeader.append(thHTMLPlayer);
    trHTMLHeader.append(thHTMLGoal10);
    trHTMLHeader.append(thHTMLGoal30);
    /* Inner Text */
    thHTMLGroup.innerText = "GROUP";
    thHTMLPlayer.innerText = "PLAYER";
    thHTMLGoal10.innerText = "GOAL: TOP 10";
    thHTMLGoal30.innerText = "GOAL: TOP 30";
    /* CSS classes */
    tableHTML.className = "players";
    if (fadeInBoolean) tableHTML.style.animation = fadeInEffect;
    thHTMLPlayer.className = "player-name";
    /* Title */
    // trHTMLHeader.title = allPlayersTitle;
    /* Cell width */
    thHTMLGroup.colSpan = "2";
    thHTMLGoal10.colSpan = "7";
    thHTMLGoal30.colSpan = "2";
    /* DINAMIC ROWS  */
    /* playersList - coming from "../js/globalVariables.js" */
    for (let player of playersList) {
        /* Create */
        const trHTMLDynamic = document.createElement("tr");
        const tdHTMLGroup10 = document.createElement("td");
        const tdHTMLGroup30 = document.createElement("td");
        const tdHTMLPlayerName = document.createElement("td");
        /* Append */
        tableHTML.append(trHTMLDynamic);
        trHTMLDynamic.append(tdHTMLGroup10);
        trHTMLDynamic.append(tdHTMLGroup30);
        trHTMLDynamic.append(tdHTMLPlayerName);
        /* Each TD html element contains a BUTTON html element which is also APPENDED */
        const btnHTMLGroup10 = document.createElement("button");
        const btnHTMLGroup30 = document.createElement("button");
        const btnHTMLPlayerName = document.createElement("button");
        tdHTMLGroup10.append(btnHTMLGroup10);
        tdHTMLGroup30.append(btnHTMLGroup30);
        tdHTMLPlayerName.append(btnHTMLPlayerName);
        /* BUTTONS Inner Texts */
        btnHTMLGroup10.innerText = "Top 10";
        btnHTMLGroup30.innerText = "Top 30";
        btnHTMLPlayerName.innerText = player.name;
        /* CSS, Title */
        btnHTMLPlayerName.style.cursor = "help";
        if (player.group !== "" || player.goal !== 0) {
            btnHTMLPlayerName.title = `Pressing on player's name, RESETS group and goal to initial values.`;
        }
        if (player.group === "" && player.goal === 0) {
            btnHTMLPlayerName.title = `Current player is not PARTICIPATING in the RS event. \nTo make them participate, choose TOP 10 or TOP 30 (on the left).`;
        }
        /*
            Each group has Y amount of seats;
            User cannot click on the "top-X-group" buttons more than exactly Y times;
            To let the user now how many seats are left in each group, this function uses TITLE attribute;
            When user wants to click more than Y times on the same group - disable the that groups "top-X-group" buttons;
        */
        disableGroupBtnDependingOnNumberOfSeatsRemaining(player, "top 10", btnHTMLGroup10);
        disableGroupBtnDependingOnNumberOfSeatsRemaining(player, "top 30", btnHTMLGroup30);
        /* CSS classes for "player name" button */
        btnHTMLPlayerName.className = "player-name";
        if (player.group === "") btnHTMLPlayerName.classList.add("inactive");
        /* Creates cells that have "top-10-amount"/"top-30-amount" class on them, and listens to "click" event */
        /* top10SubgroupList and top30SubgroupList - coming from INDEX.HTML */
        createGoalCells(player, top10SubgroupList, trHTMLDynamic);
        createGoalCells(player, top30SubgroupList, trHTMLDynamic);
        /* LISTEN: "top-10-group" / "top-30-group" / "player-name" buttons */
        tdHTMLGroup10.addEventListener("click", () => {
            let previousGroup = player.group;
            increaseSeatOfCorrectSubgroup(player);
            resetPlayer(player, "top 10");

            addOrRemoveParticipantCurrentPointsToCorrectUIHGroup(player, previousGroup);    // test

            saveToLS();
            refreshAllPlayersPage();
        });
        tdHTMLGroup30.addEventListener("click", () => {
            let previousGroup = player.group;
            increaseSeatOfCorrectSubgroup(player);
            resetPlayer(player, "top 30");

            addOrRemoveParticipantCurrentPointsToCorrectUIHGroup(player, previousGroup);    // test

            saveToLS();
            refreshAllPlayersPage();
        });
        tdHTMLPlayerName.addEventListener("click", () => {
            let previousGroup = player.group;
            increaseSeatOfCorrectSubgroup(player);
            resetPlayer(player);

            /* needs to have previous group */
            addOrRemoveParticipantCurrentPointsToCorrectUIHGroup(player, previousGroup);   // test

            saveToLS();
            refreshAllPlayersPage();
        });
    }
}
///
/// TOP 10 SEATS or TOP 30 SEATS
///
function renderSeatsTop10or30Table(parentHTML, groupName, fadeInBoolean = false) {
    parentHTML.innerHTML = "";
    /* Create */
    const tableHTML = document.createElement("table");
    const captionHTML = document.createElement("caption");
    const tHeadHTML = document.createElement("thead");
    const trHTMLHeader = document.createElement("tr");
    const thHTMLGroup = document.createElement("th");
    const thHTMLSeats = document.createElement("th");
    const tBodyHTML = document.createElement("tbody");
    const tFootHTML = document.createElement("tfoot");
    /* Append */
    parentHTML.append(tableHTML);
    tableHTML.append(captionHTML);
    tableHTML.append(tHeadHTML);
    tableHTML.append(tBodyHTML);
    tableHTML.append(tFootHTML);
    tHeadHTML.append(trHTMLHeader);
    trHTMLHeader.append(thHTMLGroup);
    trHTMLHeader.append(thHTMLSeats);
    /* Inner Text */
    captionHTML.innerText = `${groupName.charAt(0).toUpperCase().concat(groupName.slice(1))} Group Seats:`;
    thHTMLGroup.innerHTML = "SUBGROUP";
    // thHTMLGroup.innerHTML = "&nbsp;GROUP&nbsp;";
    thHTMLSeats.innerText = "TAKEN / TOTAL";
    /* CSS classes */
    tableHTML.className = "remaining-seats";
    if (fadeInBoolean) tableHTML.style.animation = fadeInEffect;
    /* Title */
    tHeadHTML.title = groupSeatsTitle;
    /* DINAMIC ROWS  */
    /* top10SubgroupList and top30SubgroupList - coming from INDEX.HTML */
    let topXYSubgroupList = [];
    if (groupName === "top 10") topXYSubgroupList = top10SubgroupList;
    if (groupName === "top 30") topXYSubgroupList = top30SubgroupList;
    for (let subgroup of topXYSubgroupList) generateRowForSeatsTop10or30Table(tBodyHTML, subgroup);
    /* TFOOT */
    const trFooterHTML = document.createElement("tr");
    const thFooterHTMLGroup = document.createElement("th");
    const thFooterHTMLSeats = document.createElement("th");
    tFootHTML.append(trFooterHTML);
    trFooterHTML.append(thFooterHTMLGroup);
    trFooterHTML.append(thFooterHTMLSeats);
    /* Inner Text */
    let seatsTaken = topXYSubgroupList.reduce((total, subgroup) => total + (subgroup.maxSeats - subgroup.seatsLeft), 0);
    let totalSeats = topXYSubgroupList.reduce((total, subgroup) => total + subgroup.maxSeats, 0);
    thFooterHTMLSeats.innerText = `${seatsTaken} / ${totalSeats}`;
}
///
/// PARTICIPANTS table
///
function renderParticipantsTable(parentHTML, groupName = "", status = "") {
    /* Table HTML */
    const tableHTML = document.createElement("table");
    const tHeadHTML = document.createElement("thead");
    const tBodyHTML = document.createElement("tbody");
    parentHTML.append(tableHTML);
    /* Table CSS */
    tableHTML.className = "participants";
    if (status === "uncompleted") tableHTML.classList.add("goal-uncompleted");
    if (status === "completed") tableHTML.classList.add("goal-completed");
    if (status === "") tableHTML.classList.add("no-goal");


    let groupXYParticipantsList = playersList.filter(byTheirGroup, groupName);
    if (status === "uncompleted") groupXYParticipantsList = groupXYParticipantsList.filter((e) => !onlyWithCompletedGoal(e));
    if (status === "completed") groupXYParticipantsList = groupXYParticipantsList.filter(onlyWithCompletedGoal);
    if (status === "") groupXYParticipantsList = groupXYParticipantsList.filter(onlyWithPointsAndWithoutGroup);

    /* 4 variables that count how many times has been clicked on each th */
    const trHeader = createHeaderRowForParticipantsTable(status);
    const textGoal = "GOAL";
    const textParticipantName = "PARTICIPANT";
    const textRemainingP = "REMAINING P";
    const textSurplusP = "SURPLUS P";
    const textNoStatus = "GROUP NOT ASSIGNED";
    const textCurrentP = "CURRENT P";
    let goal_Count = 0;
    let participantName_Count = 1;
    let remainingOrSurplusP_Count = 0;
    let currentP_Count = 0;

    /* LISTEN 1st TH */
    trHeader.children[0].addEventListener("click", () => {
        goal_Count++;
        if (goal_Count % 2 === 1) {
            trHeader.children[0].innerHTML = textGoal + "  &or;";
            groupXYParticipantsList.sort((a, b) => a.goal - b.goal);
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        } else {
            trHeader.children[0].innerHTML = textGoal + "  &and;";
            groupXYParticipantsList.sort((a, b) => b.goal - a.goal);
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        }
        /* rest are DEFAULT */
        trHeader.children[1].innerHTML = textParticipantName;
        participantName_Count = 1;
        if (status === "uncompleted") trHeader.children[2].innerHTML = textRemainingP;
        if (status === "completed") trHeader.children[2].innerHTML = textSurplusP;
        if (status === "") trHeader.children[2].innerHTML = textNoStatus;
        remainingOrSurplusP_Count = 0;
        trHeader.children[3].innerHTML = textCurrentP;
        currentP_Count = 0;
    });

    /* LISTEN 2st TH */
    trHeader.children[1].addEventListener("click", () => {
        participantName_Count++;
        if (participantName_Count % 2 === 1) {
            trHeader.children[1].innerHTML = textParticipantName + "  &or;";
            groupXYParticipantsList.sort((a, b) => a.name.localeCompare(b.name));
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        } else {
            trHeader.children[1].innerHTML = textParticipantName + "  &and;";
            groupXYParticipantsList.sort((a, b) => b.name.localeCompare(a.name));
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        }
        /* rest are DEFAULT */
        trHeader.children[0].innerHTML = textGoal;
        goal_Count = 0;
        if (status === "uncompleted") trHeader.children[2].innerHTML = textRemainingP;
        if (status === "completed") trHeader.children[2].innerHTML = textSurplusP;
        if (status === "") trHeader.children[2].innerHTML = textNoStatus;
        remainingOrSurplusP_Count = 0;
        trHeader.children[3].innerHTML = textCurrentP;
        currentP_Count = 0;
    });

    /* LISTEN 3st TH */
    trHeader.children[2].addEventListener("click", () => {
        remainingOrSurplusP_Count++;
        if (remainingOrSurplusP_Count % 2 === 1) {
            if (status === "uncompleted") {
                trHeader.children[2].innerHTML = textRemainingP + "  &or;";
                groupXYParticipantsList.sort((a, b) => a.remainingPoints - b.remainingPoints);
                renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
            };
            if (status === "completed") {
                trHeader.children[2].innerHTML = textSurplusP + "  &or;";
                groupXYParticipantsList.sort((a, b) => a.surplusPoints - b.surplusPoints);
                renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
            };
        } else {
            if (status === "uncompleted") {
                trHeader.children[2].innerHTML = textRemainingP + "  &and;";
                groupXYParticipantsList.sort((a, b) => b.remainingPoints - a.remainingPoints);
                renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
            };
            if (status === "completed") {
                trHeader.children[2].innerHTML = textSurplusP + "  &and;";
                groupXYParticipantsList.sort((a, b) => b.surplusPoints - a.surplusPoints);
                renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
            };
        }

        /* rest are DEFAULT */
        trHeader.children[0].innerHTML = textGoal;
        goal_Count = 0;
        trHeader.children[1].innerHTML = textParticipantName;
        participantName_Count = 1;
        trHeader.children[3].innerHTML = textCurrentP;
        currentP_Count = 0;
    });

    /* LISTEN 4st TH */
    trHeader.children[3].addEventListener("click", () => {
        currentP_Count++;
        if (currentP_Count % 2 === 1) {
            trHeader.children[3].innerHTML = textCurrentP + "  &or;";
            groupXYParticipantsList.sort((a, b) => a.currentPoints - b.currentPoints);
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        } else {
            trHeader.children[3].innerHTML = textCurrentP + "  &and;";
            groupXYParticipantsList.sort((a, b) => b.currentPoints - a.currentPoints);
            renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
        }
        /* rest are DEFAULT */
        trHeader.children[0].innerHTML = textGoal;
        goal_Count = 0;
        trHeader.children[1].innerHTML = textParticipantName;
        participantName_Count = 1;
        if (status === "uncompleted") trHeader.children[2].innerHTML = textRemainingP;
        if (status === "completed") trHeader.children[2].innerHTML = textSurplusP;
        if (status === "") trHeader.children[2].innerHTML = textNoStatus;
        remainingOrSurplusP_Count = 0;
    });
    //
    tHeadHTML.append(trHeader);
    tableHTML.append(tHeadHTML);
    /* Create DYNAMIC ROWS and APPEND them to tBodyHTML */
    renderDynamicRowsForParticipantsTable(groupXYParticipantsList, tBodyHTML, status);
    tableHTML.append(tBodyHTML);
    /* TFOOTER */
    const tFootHTML = document.createElement("tfoot");
    tableHTML.append(tFootHTML);
    const trFoot = document.createElement("tr");
    tFootHTML.append(trFoot);
    const tdFootGoal = document.createElement("td");
    const tdFootParticipant = document.createElement("td");
    const tdFootRemainingOrSurplusP = document.createElement("td");
    const tdFootCurrentP = document.createElement("td");
    trFoot.append(tdFootGoal);
    trFoot.append(tdFootParticipant);
    trFoot.append(tdFootRemainingOrSurplusP);
    trFoot.append(tdFootCurrentP);
    /* text - number of participants */
    if (groupXYParticipantsList.length === 1) tdFootParticipant.innerText = groupXYParticipantsList.length + " player";
    if (groupXYParticipantsList.length > 1) tdFootParticipant.innerText = groupXYParticipantsList.length + " players";
    /* text - number of participants */
    if (status === "uncompleted") tdFootRemainingOrSurplusP.innerText = (groupXYParticipantsList.reduce((total, participant) => total + participant.remainingPoints, 0)).toLocaleString();
    if (status === "completed") tdFootRemainingOrSurplusP.innerText = (groupXYParticipantsList.reduce((total, participant) => total + participant.surplusPoints, 0)).toLocaleString();
    tdFootCurrentP.innerText = (groupXYParticipantsList.reduce((total, participant) => total + participant.currentPoints, 0)).toLocaleString();
}
///
/// PARTICIPANTS tables (plural)
///
function renderParticipantsTables(parentHTML, groupName, fadeInBoolean = false) {
    parentHTML.innerHTML = "";
    const divHTMLParticipantsContainer = document.createElement("div");
    parentHTML.append(divHTMLParticipantsContainer);
    divHTMLParticipantsContainer.className = "participants-container";
    /* CSS animation */
    if (fadeInBoolean) divHTMLParticipantsContainer.style.animation = fadeInEffect;

    /* In case of NO GROUP participants */
    if (groupName === "") {
        renderParticipantsTable(divHTMLParticipantsContainer);
    } else {
        renderParticipantsTable(divHTMLParticipantsContainer, groupName, "uncompleted");
        renderParticipantsTable(divHTMLParticipantsContainer, groupName, "completed");
    }
}
///
///
///
/* UNFINISHED - need to get the sum of points before proceeding */
function renderUIHGroupsTable(parentHTML, fadeInBoolean = false) {
    parentHTML.innerHTML = "";
    /* Create */
    const tableHTML = document.createElement("table");
    const trHTMLHeader = document.createElement("tr");
    const captionHTML = document.createElement("caption");
    const thHTMLGroup = document.createElement("th");
    const thHTMLGoal = document.createElement("th");
    const thHTMLCurrent = document.createElement("th");
    /* Append */
    parentHTML.append(tableHTML);
    tableHTML.append(trHTMLHeader);
    tableHTML.append(captionHTML);
    trHTMLHeader.append(thHTMLGroup);
    trHTMLHeader.append(thHTMLGoal);
    trHTMLHeader.append(thHTMLCurrent);
    /* Inner Text */
    captionHTML.innerText = "Goal Completion:";
    thHTMLGroup.innerText = "GROUP";
    thHTMLGoal.innerText = "GOAL";
    thHTMLCurrent.innerText = "CURRENT";
    /* CSS classes */
    tableHTML.className = "uih-groups";
    if (fadeInBoolean) tableHTML.style.animation = fadeInEffect;
    /* Title */
    trHTMLHeader.title = uihGroupsTitle;

    /* DYNAMIC ROWS */
    /// uihGroupList - global variable located inside "../js/globalVariables.js" and is filled with data inside "loadAllData()"
    for (let group of uihGroupList) {
        /* Create */
        const trHTMLGroup = document.createElement("tr");
        const tdHTMLGroup = document.createElement("td");
        const tdHTMLGoal = document.createElement("td");
        const tdHTMLCurrent = document.createElement("td");
        /* Append */
        tableHTML.append(trHTMLGroup);
        trHTMLGroup.append(tdHTMLGroup);
        trHTMLGroup.append(tdHTMLGoal);
        trHTMLGroup.append(tdHTMLCurrent);
        /* Inner Text */
        tdHTMLGroup.innerText = group.name.charAt(0).toUpperCase().concat(group.name.slice(1));
        tdHTMLGoal.innerText = convertGoalNumToText(group.goal);
        if (group.currentPoints >= group.goal) tdHTMLCurrent.className = "goal-exceeded";
        /* Text that is gonna be displayed inside the cells */
        let displayNumbers = `${(group.currentPoints / 1_000_000).toFixed(2).concat(` m`)}`;
        let displayPercentages = `${convertCurrentPointsToPercentages(group)}`;
        /* In the case this table is rendered inside ASIDE element - in the last column display only % and color the cell if goal is EXCEEDED  */
        let displayInfo = ``;
        if (parentHTML.id === "uih-groups") displayInfo = `${displayPercentages}`;
        if (parentHTML.id !== "uih-groups") {
            displayInfo = `${displayNumbers} (${displayPercentages})`;
            tableHTML.style.width = "auto";
        };
        tdHTMLCurrent.innerText = displayInfo;
    }
}