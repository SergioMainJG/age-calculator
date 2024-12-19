const calculateButton: HTMLButtonElement = document.querySelector('#calculate-age') as HTMLButtonElement;

function formatterDate(date: Date): string {
    return Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

    }).format(date);
}
function calculateAge(birthdate: Date): [string, string, string] {
    const today = new Date();
    console.log(today)
    const [
        dayBirthdate,
        monthBirthdate,
        yearBirthdate,
        dayToday,
        monthToday,
        yearToday,
    ] = [
            birthdate.getUTCDate(),
            birthdate.getUTCMonth(),
            birthdate.getUTCFullYear(),
            today.getUTCDate(),
            today.getUTCMonth(),
            today.getUTCFullYear()
        ];

    let yearAge: number = yearToday - yearBirthdate;
    let monthAge: number = monthToday - monthBirthdate;
    let dayAge: number = dayToday - dayBirthdate;

    if ((monthToday === monthBirthdate) && (dayToday > dayBirthdate)) {
        dayAge = dayToday - dayBirthdate;
    }
    if ((monthToday === monthBirthdate) && (dayToday === dayBirthdate)) {
        dayAge = 0;
    }
    if ((monthToday === monthBirthdate) && (dayToday < dayBirthdate)) {
        yearAge = yearToday - yearBirthdate - 1;
        monthAge = 12 + monthToday - monthBirthdate - 1;
        dayAge = 30 + dayToday - dayBirthdate;
    }

    const todayFormat = formatterDate(today).replace(/,/, '').split(' ');
    const birthdateFormat = formatterDate(birthdate).replace(/,/, '').split(' ');
    todayFormat[1] = String(Number(todayFormat[1]));
    birthdateFormat[1] = String(Number(birthdateFormat[1]) + 1);

    const result = `You are ${yearAge} years with ${monthAge} months and ${dayAge} days old! 😱😮`;
    return [
        `Today is: ${todayFormat.join(' ')}`,
        `Your birthdate is: ${birthdateFormat.join(' ')}`,
        result
    ];
}
calculateButton.addEventListener('click', () => {
    const birthdate: HTMLInputElement = document.querySelector('#user-birthdate') as HTMLInputElement;
    const output: HTMLElement = document.querySelector('#output-birthdate') as HTMLElement;
    output.innerHTML = '';
    const inputDate = new Date(birthdate.value);
    const finalLimitDate = new Date('2023-12-31T00:00:00');
    const initLimitDate = new Date('1970-01-01T00:00:00.000Z');
    const [
        limitInitYear,
        limitFinalYear,
        inputYear,
    ] = [
            initLimitDate.getUTCFullYear(),
            finalLimitDate.getUTCFullYear(),
            inputDate.getUTCFullYear()
        ];

    if (inputYear > limitFinalYear){
        output.innerText = 'You need put a valid date equal or under than: ' + formatterDate( finalLimitDate );
        return;
        
    }
    if ( inputYear < limitInitYear ) {
        output.innerText = 'You need put a valid date equal or major than: ' + formatterDate( initLimitDate );
        return;
    }

    let age: [string, string, string] = ['', '', ''];
    if (inputDate.toString() === 'Invalid Date') age = ['You need put a valid date', '', ''];
    else age = calculateAge(inputDate);

    const todayOutput = document.createElement('h3');
    const birthdateOutput = document.createElement('h3');
    const resultOutput = document.createElement('h3');
    todayOutput.classList.add("m-attractive-text");
    todayOutput.classList.add("is-calculated");
    birthdateOutput.classList.add("m-attractive-text");
    birthdateOutput.classList.add("is-calculated");
    resultOutput.classList.add("m-attractive-text");
    resultOutput.classList.add("is-calculated");

    todayOutput.textContent = age[0];
    birthdateOutput.textContent = age[1];
    resultOutput.textContent = age[2];

    output.appendChild(todayOutput);
    output.appendChild(birthdateOutput);
    output.appendChild(resultOutput);

});


