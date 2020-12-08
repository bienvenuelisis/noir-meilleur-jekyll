function hideAll() {
    $('#analysis-symptoms-results-test-covid19').empty();
    hidden('evaluation-facteurs-risks-covid19', true);
    hidden('loading-message', true);
    hidden('btn-finish-survey', true);
}

hideAll();

$(document).ready(function (e) {
    let SURVEY_IDENTIFIER = '';
    const loaderSpinner = $('#final_loader');
    const btnMoveNext = $('#btn-move-next');
    const btnMoveLast = $('#move-previous-icon');
    const btnFinishSurvey = $('#btn-finish-survey');
    const surveyStepIdentifierClass = 'survey-step-auto-';

    let labelErrorFields = $('#label-error-query-empty-fields');

    function disableNextBtn() {
        btnMoveNext.prop('disabled', true);
        btnMoveNext.removeClass('btn-info');
        btnMoveNext.addClass('btn-outline-info');
    }

    function enableNextBtn() {
        btnMoveNext.prop('disabled', false);
        btnMoveNext.removeClass('btn-outline-info');
        btnMoveNext.addClass('btn-info');
    }

    const steps = $('.survey-step');

    let actualStepNb = 1;

    let actualStepID = '';

    let actualStepOrder = 0;

    let questionsNbTotal = 0;

    const isOnMobile = isMobile();

    const animateOffSet = (isOnMobile) ? 27 : 9;

    function radioInputIsSet(name) {
        return radioInputValue(name) !== undefined;
    }

    function checkBoxInputIsSet(name) {
        return radioInputValue(name) !== undefined;
    }

    function showFieldsError() {
        //labelErrorFields.prop('hidden', false);
    }

    function hideFieldsError() {
        //labelErrorFields.prop('hidden', true);
        labelErrorFields.html('');
    }

    function isValidTemperature() {

        if (!radioInputIsSet('useThermometerRadio')) {
            labelErrorFields.html('Veillez indiquer si "Oui" ou "Non", votre sensation de fièvre a été confirmé ' +
                'par l\'utilisation d\'un Thermomètre.');
            return false;
        }

        if (radioInputValue('useThermometerRadio') === 'true') {
            if (!validateInput('feverDegreeCelsiusInput')) {
                labelErrorFields.html('Entrez votre température.');
                return false;
            } else {
                const temperatureMin = 36;
                const temperatureMax = 42;

                const temperature = Number(value('feverDegreeCelsiusInput'));

                if (temperature < temperatureMin || temperature > temperatureMax) {
                    labelErrorFields.html('La valeur de la température doit être entre 36 et 42 °Celsius.');
                    return false;
                }
                return true;
            }
        } else {
            return true;
        }
    }

    function validateAge() {

        if (!validateInput('ageInput')) {
            labelErrorFields.html('Entrez votre âge.');
            return false;
        }

        const min = 1;
        const max = 120;

        const age = Number(value('ageInput'));

        if (age < min || age > max) {
            labelErrorFields.html('Votre âge doit être entre 1 an et 120 ans.');
            return false;
        }
        validateInput('heightInput');
        $('#heightInput').focus();
        return true;
    }

    function validateHeight() {

        if (!validateInput('heightInput')) {
            labelErrorFields.html('Entrez votre taille, en cm.');
            return false;
        }

        const min = 80;
        const max = 240;

        const height = Number(value('heightInput'));

        if (height < min || height > max) {
            labelErrorFields.html('Votre taille doit être entre ' + min + ' et ' + max + ' cm.');
            return false;
        }
        validateInput('weightInput');
        $('#weightInput').focus();
        return true;
    }

    function validateWeight() {

        if (!validateInput('weightInput')) {
            labelErrorFields.html('Entrez votre poids, en Kg.');
            return false;
        }

        const min = 20;
        const max = 250;

        const weight = Number(value('weightInput'));

        if (weight < min || weight > max) {
            labelErrorFields.html('Votre poids doit être entre ' + min + ' et ' + max + ' Kg.');
            return false;
        }
        return true;
    }

    function consumesOneChecked() {
        return $('#consommationCheckAlcohol').is(':checked') || $('#consommationCheckTobacco').is(':checked') ||
            $('#consommationCheckWildAnimals').is(':checked') || $('#consommationCheckNone').is(':checked');
    }

    function contactPersonChecked() {
        return $('#professionalInChargeOfCOVID19Patients').is(':checked') || $('#recentTravelToRiskyZone').is(':checked') ||
            $('#contactWitConfirmedPatient').is(':checked') || $('#contactCaseNone').is(':checked');
    }

    function stateWomanChecked() {
        return radioInputIsSet('ovulationPeriodRadio');

        //return $('#menstrualPeriods').is(':checked') || $('#moodStressPeriods').is(':checked') ||
        //        $('#stateWomanNone').is(':checked') || $('#ovulationPeriod').is(':checked');
    }

    function pregnantValidation() {
        if (!radioInputIsSet('pregnantRadio'))
            return false;

        if (radioInputValue('pregnantRadio') === 'true') {
            return radioInputIsSet('thirdTrimesterPregnancyRadio');
        } else {
            return true;
        }
    }

    function highBloodPressureValidation() {
        if (!radioInputIsSet('highBloodPressureRadio'))
            return false;

        if (radioInputValue('highBloodPressureRadio') === 'true') {
            return true;
        } else {
            return true;
        }
    }

    function stepValidation() {
        switch (actualStepID) {

            case 'feverStep':
                $('#feverDegreeCelsiusInput').focus();
                return radioInputIsSet('feverRadio');

            case 'feverDegreeCelsiusStep':
                return isValidTemperature();

            case 'coughStep':
                return radioInputIsSet('coughRadio');

            case 'looseTasteSmellStep':
                return radioInputIsSet('looseTasteSmellRadio');

            case 'soreThroatStep':
                return radioInputIsSet('soreThroatRadio');

            case 'chestPainStep':
                return radioInputIsSet('chestPainRadio');

            case 'diarrheaStep':
                return radioInputIsSet('diarrheaRadio');

            case 'puffinessStep':
                return radioInputIsSet('puffinessRadio');

            case 'shortOfBreathStep':
                return radioInputIsSet('shortOfBreathRadio');

            case 'breathLessStep':
                return radioInputIsSet('breathLessRadio');

            case 'tiredStep':
                return radioInputIsSet('tiredRadio');

            case 'pauseStep':
                return radioInputIsSet('pauseRadio');

            case 'bodyAchesStep':
                return radioInputIsSet('bodyAchesRadio');

            case 'genderStep':
                return radioInputIsSet('genderRadio');

            case 'cantFoodDrinkStep':
                $('#ageInput').focus();
                return radioInputIsSet('cantFoodDrinkRadio');

            case 'ageStep':
                return validateAge();

            case 'heightStep':
                return validateHeight();

            case 'weightStep':
                return validateWeight();

            case 'pregnantStep':
                return pregnantValidation();

            case 'highBloodPressureStep':
                return highBloodPressureValidation();

            case 'cancerStep':
                return radioInputIsSet('cancerRadio');

            case 'diseaseLungStep':
                return radioInputIsSet('diseaseLungRadio');

            case 'diseaseKidneyStep':
                return radioInputIsSet('diseaseKidneyRadio');

            case 'diseaseLiverStep':
                return radioInputIsSet('diseaseLiverRadio');

            case 'immunoDepressifStep':
                return radioInputIsSet('immunoDepressifRadio');

            case 'immunoSuppressantStep':
                return radioInputIsSet('immunoSuppressantRadio');

            case 'antiInflammatoryStep':
                return radioInputIsSet('antiInflammatoryRadio');

            case 'respectHygieneStep':
                return radioInputIsSet('respectHygieneRadio');

            case 'growsTeethStep':
                return radioInputIsSet('growsTeethRadio');

            case 'contactPersonStep':
                return contactPersonChecked();

            // case 'stateWomanStep':
            //     return stateWomanChecked();

            case 'consommationStep':
                return consumesOneChecked();

            case '':
                return true;

            default:
                return true;
        }
    }

    function enableAutoNext() {
        return true;
    }

    function canBeMoveNextAuto() {
        switch (actualStepID) {

            case 'highBloodPressureStep':
                return !(radioInputValue('highBloodPressureRadio') === 'true');

            case 'diseaseLungStep':
                return radioInputIsSet('diseaseLungRadio');

            case '':
                return true;

            default:
                return true;
        }
    }

    function tryMoveNextAuto() {
        if (actualStepNb > 1 && stepValidation() && canBeMoveNextAuto()) {
            moveNext();
        }
    }

    function getErrorMessage() {
        switch (actualStepID) {

            case '':
                return 'Répondez à la question posée (Choisissez au moins une option).';

            default:
                return 'Répondez à la question posée (Choisissez au moins une option).';
        }
    }

    function updateProgressBar() {
        const pourcent = (Number(actualStepOrder) / questionsNbTotal) * 100;
        $("#dynamic").css("width", pourcent + "%").attr("aria-valuenow", pourcent);
        $('#label-step-progress-number').html(actualStepOrder + '/' + questionsNbTotal);
    }

    function responsesMap() {
        let surveyInfoMap = new FormData();
        const radios = ['fever', 'cough', 'looseTasteSmell', 'soreThroat', 'chestPain', 'diarrhea', 'shortOfBreath',
            'breathLess', 'tired', 'pause', 'cantFoodDrink', 'gender', 'pregnant', 'highBloodPressure', 'cancer',
            'diseaseLung', 'diseaseKidney', 'diseaseLiver', 'immunoDepressif', 'immunoSuppressant', 'antiInflammatory',
            'respectHygiene', 'useThermometer', 'thirdTrimesterPregnancy', 'growsTeeth', 'ovulationPeriod',
            'bodyAches', 'puffiness'];
        const inputs = ['feverDegreeCelsius', 'age', 'height', 'weight'];
        $.each(radios, function (i, radioName) {
            if (radioInputIsSet(radioName + 'Radio'))
                surveyInfoMap.append(radioName, radioInputValue(radioName + 'Radio'));
        });
        $.each(inputs, function (i, inputName) {
            if (!isEmptyInput(inputName + 'Input'))
                surveyInfoMap.append(inputName, value(inputName + 'Input'));
        });
        if (radioInputValue('highBloodPressureRadio') === 'true') {
            surveyInfoMap.append('systolicPressureInput', value('systolicPressureInput'));
            surveyInfoMap.append('diastolicPressureInput', value('diastolicPressureInput'));
        }
        if (consumesOneChecked()) {
            surveyInfoMap.append('consumesAlcohol', $('#consommationCheckAlcohol').is(':checked'));
            surveyInfoMap.append('consumesWildAnimals', $('#consommationCheckWildAnimals').is(':checked'));
            surveyInfoMap.append('consumesTobacco', $('#consommationCheckTobacco').is(':checked'));
        }
        if (contactPersonChecked()) {
            surveyInfoMap.append('professionalInChargeOfCOVID19Patients', $('#professionalInChargeOfCOVID19Patients').is(':checked'));
            surveyInfoMap.append('recentTravelToRiskyZone', $('#recentTravelToRiskyZone').is(':checked'));
            surveyInfoMap.append('contactWitConfirmedPatient', $('#contactWitConfirmedPatient').is(':checked'));
        }

        //if (stateWomanChecked()) {
        //Because remove other woman state check.
        if (false) {
            surveyInfoMap.append('ovulationPeriod', $('#ovulationPeriod').is(':checked'));
            surveyInfoMap.append('menstrualPeriods', $('#menstrualPeriods').is(':checked'));
            surveyInfoMap.append('moodStressPeriods', $('#moodStressPeriods').is(':checked'));
        }
        //surveyInfoMap.append('surveyIdentifier', SURVEY_IDENTIFIER);
        surveyInfoMap.append('identifier', SURVEY_IDENTIFIER);
        surveyInfoMap.append('endSurvey', actualStepOrder === questionsNbTotal);
        surveyInfoMap.append('lastSurveyStep', actualStepOrder);
        return surveyInfoMap;
    }

    function initOrUpdateSurveyResponse() {
        if (isEmptyValue(SURVEY_IDENTIFIER)) {
            setTimeout(function () {
                $.ajax({
                    url: '/COVID19/initSurveyInfo',
                    type: 'POST',
                    data: {
                        storageKey: getSessionLocalStorageInit(),
                        identifier: SURVEY_IDENTIFIER
                    },

                    success: function (results) {
                        if (ajaxResultIsOkay(results)) {
                            SURVEY_IDENTIFIER = results['identifier'];
                        }
                    },

                    error: function (results) {
                    }
                });
            }, 1200);
        } else {
            setTimeout(function () {
                let mapSurveyData = responsesMap();
                $.ajax({
                    url: '/COVID19/updateSurveyInfo',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: mapSurveyData,

                    success: function (results) {
                    },

                    error: function (results) {
                    }
                });
            }, 1200)
        }
    }

    function showThisStep(moveNext) {
        if (actualStepNb > 1) {
            $('html, body').animate({
                scrollTop:
                    //$('#quizz-survey-manual-container').offset().top - animateOffSet
                    $('#quizz-survey-manual-container').offset().top - animateOffSet
            }, 'slow');
        }
        let thisStep = $('.' + surveyStepIdentifierClass + actualStepNb);
        hideFieldsError();
        steps.prop('hidden', true);
        thisStep.prop('hidden', false);
        steps.removeClass('fadeInRight');
        steps.removeClass('fadeInLeft');

        if (moveNext) {
            thisStep.addClass('fadeInRight');
        } else {
            thisStep.addClass('fadeInLeft');
        }

        actualStepID = thisStep.attr('id');
        actualStepOrder = thisStep.data('step');
        updateProgressBar();
    }

    function moveToStep(moveNext) {
        showThisStep(moveNext);
        if (actualStepNb === 1) {
            btnMoveNext.html('Démarrer le Test');
            btnMoveLast.prop('hidden', true);
        } else if (questionsNbTotal === actualStepNb) {
            btnMoveNext.prop('hidden', true);
            btnFinishSurvey.prop('hidden', false);
        } else {
            btnMoveNext.html('Suivant');
            btnMoveLast.prop('hidden', false);
            btnMoveNext.prop('hidden', false);
            btnFinishSurvey.prop('hidden', true);
            if ((actualStepNb % 5
                ) ===
                0
            )
            {
                initOrUpdateSurveyResponse();
            }
        }
    }

    function _moveNext() {
        if (actualStepNb === questionsNbTotal) {
            btnFinishSurvey.prop('hidden', false);
            btnMoveNext.prop('hidden', true);
            return;
        }
        actualStepNb += 1;
        moveToStep(true);
    }

    function moveNext() {
        if (stepValidation()) {
            stepsLogic(true);
            _moveNext();
        } else {
            if (isEmptyValue(labelErrorFields.html()))
                labelErrorFields.html(getErrorMessage());
            showFieldsError();
        }
    }

    const MAX_CHILD_AGE = 3;

    function stepsLogic(moveNext) {
        if (moveNext) {
            switch (actualStepID) {
                case 'feverStep':
                    if (radioInputValue('feverRadio') === 'false') {
                        ++actualStepNb;
                    }
                    break;

                case 'shortOfBreathStep':
                    if (radioInputValue('shortOfBreathRadio') === 'false') {
                        ++actualStepNb;
                    }
                    break;

                case 'tiredStep':
                    if (radioInputValue('tiredRadio') === 'false') {
                        ++actualStepNb;
                    }
                    break;

                case 'ageStep':
                    if (Number(value('ageInput')) > MAX_CHILD_AGE ||
                        radioInputValue('feverRadio') === 'false') {
                        ++actualStepNb;
                    }
                    break;

                case 'genderStep':
                    if (radioInputValue('genderRadio') === 'male') {
                        actualStepNb++;
                    }
                    // else {
                    //     if (radioInputValue('feverRadio') === 'false') {
                    //         ++actualStepNb;
                    //     }
                    // }
                    break;

                case 'puffinessStep':
                    if (radioInputValue('puffinessRadio') === 'false') {
                        actualStepNb += 2;
                    }
                    break;
            }
        } else {
            switch (actualStepID) {
                case 'coughStep':
                    if (radioInputValue('feverRadio') === 'false') {
                        --actualStepNb;
                    }
                    break;

                case 'bodyAchesStep':
                    if (radioInputValue('puffinessRadio') === 'false') {
                        actualStepNb -= 2;
                    } else if (radioInputValue('shortOfBreathRadio') === 'false') {
                        --actualStepNb;
                    }
                    break;

                case 'cantFoodDrinkStep':
                    if (radioInputValue('tiredRadio') === 'false') {
                        --actualStepNb;
                    }
                    break;

                case 'highBloodPressureStep':
                    if (radioInputValue('genderRadio') === 'male') {
                        actualStepNb--;
                    }
                    break;

                // case 'pregnantStep':
                //     if (radioInputValue('feverRadio') === 'false') {
                //         --actualStepNb;
                //     }
                //     break;

                case 'heightStep':
                    if (Number(value('ageInput')) > MAX_CHILD_AGE ||
                        radioInputValue('feverRadio') === 'false') {
                        --actualStepNb;
                    }
                    break;
            }
        }
    }

    btnMoveNext.click(function (e) {
        e.preventDefault();
        moveNext();
    });

    function _moveLast() {
        enableNextBtn();
        if (actualStepNb === 1) {
            btnMoveLast.prop('hidden', true);
            btnMoveNext.prop('hidden', false);
            return;
        }
        --actualStepNb;
        moveToStep(false);
    }

    function moveLast() {
        stepsLogic(false);
        _moveLast();
    }

    btnMoveLast.click(function () {
        moveLast();
    });

    function hideLoader() {
        loaderSpinner.prop('hidden', true);
    }

    function showLoader() {
        loaderSpinner.prop('hidden', false);
        $('html, body').animate({
            scrollTop:
                $('#quizz-survey-manual-container').offset().top - animateOffSet
        }, 'slow');
    }

    function init() {
        steps.each(function (i) {
            questionsNbTotal++;
            $(this).addClass(surveyStepIdentifierClass + (i + 1));
            $(this).data('step', (i + 1));
        });
        initSettings();
    }

    function initSettings() {
        //const switchSurvey = document.querySelector('.js-switch-settings-survey');
        //new Switchery(switchSurvey, {color: '#1abc9c', jackColor: '#fff'});
        if (!isOnMobile) {
            $('#label-auto-step').html('Questionnaire rapide et pertinent');
            $('.form-check-inline').after('<br>');
        }
    }

    setTimeout(function () {
        init();
        hideLoader();
        showTest();
        moveToStep(true);
        btnMoveNext.prop('hidden', false);
        resetInputs();
        //tippy('.tippy');
    }, 240);

    $('input[type=radio]').on('click change edit', function () {
        enableNextBtn();
        hideFieldsError();
        setTimeout(function () {
            tryMoveNextAuto();
        }, 240)
    });

    $("input[name='pregnantRadio']").on('click change edit', function () {
        if (radioInputValue('pregnantRadio') === 'true') {
            hidden('thirdTrimesterPregnancyQuestion', false);
        } else {
            hidden('thirdTrimesterPregnancyQuestion', true);
        }
    });

    $("input[name='useThermometerRadio']").on('click change edit', function () {
        if (radioInputValue('useThermometerRadio') === 'true') {
            hidden('feverDegreeCelsiusQuestion', false);
        } else {
            hidden('feverDegreeCelsiusQuestion', true);
        }
    });

    $("input[name='highBloodPressureRadio']").on('click change edit', function () {
        if (radioInputValue('highBloodPressureRadio') === 'true') {
            hidden('highBloodPressureValues', false);
        } else {
            hidden('highBloodPressureValues', true);
        }
    });

    $('input[type=checkbox]').on('click change edit', function (e) {
        enableNextBtn();
        hideFieldsError();
    });

    $('input[type=number]').on('click change edit keyup', function (e) {
        enableNextBtn();
        hideFieldsError();
        if (e.keyCode === 13) {
            setTimeout(function () {
                tryMoveNextAuto();
            }, 240)
        }
    });

    $('#consommationCheckNone').on('click change edit', function () {
        $('.consommation-cb').prop('checked', false);
    });

    $('.consommation-cb').on('click change edit', function () {
        $('#consommationCheckNone').prop('checked', false);
    });

    $('#contactCaseNone').on('click change edit', function () {
        $('.contactPerson-cb').prop('checked', false);
    });

    $('.contactPerson-cb').on('click change edit', function () {
        $('#contactCaseNone').prop('checked', false);
    });

    $('#stateWomanNone').on('click change edit', function () {
        $('.stateWoman-cb').prop('checked', false);
    });

    $('.stateWoman-cb').on('click change edit', function () {
        $('#stateWomanNone').prop('checked', false);
    });

    $('#ovulationPeriod').on('click change edit', function () {
        $('#menstrualPeriods').prop('checked', false);
    });

    $('#menstrualPeriods').on('click change edit', function () {
        $('#ovulationPeriod').prop('checked', false);
    });

    const evaluationFacteursRisks = $('#evaluation-facteurs-risks-covid19');
    const resultSurveyTestView = $('#analysis-symptoms-results-test-covid19');
    const generalRecommendations = $('#general-recommendations-gouv-covid19');
    const ourRecommendations = $('#ecare-recommendations-generals-covid19');

    function getIcon(testResult) {
        switch (testResult) {
            case 'A':
                return '<i><img style="width: 36px; !important; height: auto; !important;"' +
                    ' src="/public/images/ecare/svg/check.svg"></i>';

            case 'B':
                return '<i><img style="width: 36px; !important; height: auto; !important;"' +
                    ' src="/public/images/ecare/svg/alert.svg"></i>';

            case 'C':
                return '<i><img style="width: 36px; !important; height: auto; !important;"' +
                    ' src="/public/images/ecare/svg/warning.svg"></i>';

            case 'D':
                return '<i><img style="width: 36px; !important; height: auto; !important;"' +
                    ' src="/public/images/ecare/svg/alarm.svg"></i>';
        }
    }

    function showResultsTest() {
        hideLoader();
        hidden('loading-message', true);
        hidden('analysis-symptoms-results-container-parent', true);
        evaluationFacteursRisks.prop('hidden', false);
        generalRecommendations.prop('hidden', false);
        ourRecommendations.prop('hidden', false);
        resultSurveyTestView.prop('hidden', false);
        _showFeedbackFeature();
    }

    function hideResultsTest() {
        hidden('analysis-symptoms-results-container-parent', true);
        evaluationFacteursRisks.prop('hidden', true);
        generalRecommendations.prop('hidden', true);
        ourRecommendations.prop('hidden', true);
    }

    function executeRequestSaveDataSurveys() {
        let mapSurveyData = responsesMap();
        $.ajax({
            url: '/COVID19/updateSurveyInfo',
            type: 'POST',
            contentType: false,
            processData: false,
            data: mapSurveyData,

            success: function (results) {
                $.ajax({
                    url: '/COVID19/surveyTestSymptomsResultsAndActions/',
                    type: 'POST',
                    data: {
                        identifier: results['identifier']
                    },

                    success: function (surveyResult) {
                        if (ajaxResultIsFail(surveyResult)) {
                            pNotifyResultWarn(surveyResult);
                        } else {
                            hidden('loading-message', false);
                            showTestResultsAndRecommendations(surveyResult);
                        }
                    },

                    error: function (surveyResult) {
                    }
                });
            },

            error: function (results) {
            }
        });
    }

    btnFinishSurvey.click(function (e) {
        e.preventDefault();
        hideTest();
        showLoader();
        executeRequestSaveDataSurveys();
    });

    function hideTest() {
        hidden('btn-finish-survey', true);
        hidden('header-progress-bar', true);
        hidden('analysis-symptoms-survey-header-top', true);
        hidden('quizz-survey-manual-container', true);
    }

    function showTest() {
        hidden('header-progress-bar', false);
        hidden('analysis-symptoms-survey-header-top', false);
        hidden('quizz-survey-manual-container', false);
        hidden('survey-form-container-steps', false);
        hidden('btn-move-next', false);
        hidden('btn-finish-survey', true);
    }
});


