$.getJSON("@{'public/surveys/json/testCovid19SymptomsRisks.json'}",
    function (json) {
        intSurveyCovid19Test(json);
    });