const batteryLevel = document.querySelector('.batteryLevel');
const batteryCharging = document.querySelector('.batteryCharging');
const batteryChargingTime = document.querySelector('.batteryChargingTime');
const batteryDisChargingTime = document.querySelector('.batteryDisChargingTime');
const alertMessage = document.querySelector('.alertMessage');

// Battery API

const battery = () => {
    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            if (battery.level * 100 > 90 & battery.charging) {
                const alertSMS = "Battery has fully charged🔋, you can remove!";
                alertMessage.innerHTML = alertSMS;
            }
            if (battery.level * 100 === 50) {
                const alertSMS = "Battery is half charged🔋";
                alertMessage.innerHTML = alertSMS;
            }
            if (battery.level * 100 <= 10 & !battery.charging) {
                const alertSMS = "Battery is low, please plunging it!";
                alert(alertSMS);
            }

            function updateAllBatterDetails() {
                updateChargingInfo();
                updateLevelChange();
                updateDisChargeTime();
                updateChargingTimeChange();
            }

            updateAllBatterDetails()
                // Battery charging change event listener
            battery.addListener("chargingchange", () => {
                updateChargingInfo();
            })

            function updateChargingInfo() {
                const ischarging = battery.charging ? "Yes" : "No";
                batteryCharging.innerHTML = ischarging;
            }
            // battery  charging time
            battery.addListener("chargingtimechange", () => {
                updateChargingTimeChange();
            })

            function updateChargingTimeChange() {
                const chargeingTime = battery.chargingTime;
                batteryChargingTime.innerHTML = chargeingTime + " seconds";
            }
            // battery  discharging time
            battery.addListener("dischargingtime", () => {
                updateDisChargeTime();
            })

            function updateDisChargeTime() {
                const discharge = battery.dischargingTime;
                const result = discharge / 3600;
                batteryDisChargingTime.innerHTML = result.toFixed(2) + " Hrs";
            }
            // battery level changes
            battery.addListener("batterylevelchange", () => {
                updateLevelChange();
            })

            function updateLevelChange() {
                const level = battery.level * 100;
                batteryLevel.innerHTML = level + " %";
            }
            // battery  status
        })
    }
}

// calling function
battery()