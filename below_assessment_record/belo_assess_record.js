const inputField = document.getElementById('payment');

// Add event listener for input changes
inputField.addEventListener('input', function() {
    // Get the input value
    let input = this.value;
    
    // Calculate and update outputs
    calculateAndDisplay(input);
});

// Function to calculate and display results
function calculateAndDisplay(input) {
    // Remove commas and convert to number
    const value = parseFloat(input.replace(/,/g, '')) || 0;
    
    let firstOutput, firstCalcText, sixthOutput, sixthCalcText;
    
    // Apply different rules based on the value range for first/third outputs
    if (value < 1000) {
        // Calculate for values below 1,000
        firstOutput = (value * 0.1716).toFixed(2);
        firstCalcText = `${value} × 17.16% = ${firstOutput}`;
    } 
    else if (value >= 1000 && value <= 5000) {
        // Fixed values for range 1,000 to 5,000
        firstOutput = 171.60;
        firstCalcText = `Value is between 1,000 and 5,000: Fixed at 171.60`;
    } 
    else if (value > 5000 && value <= 9999) {
        // Fixed values for range 5,001 to 9,999
        firstOutput = 171.60;
        firstCalcText = `Value is between 5,001 and 9,999: Fixed at 171.60`;
    }
    else if (value >= 10000 && value <= 14999) {
        // Values for range 10,000 to 14,999
        firstOutput = 171.60;
        firstCalcText = `Value is between 10,000 and 14,999: Fixed at 171.60`;
    }
    else if (value >= 15000 && value <= 20000) {
        // Values for range 15,000 to 20,000
        firstOutput = 300.00;
        firstCalcText = `Value is between 15,000 and 20,000: Fixed at 300.00`;
    }
    else if (value > 20000 && value <= 30000) {
        // Values for range 20,001 to 30,000
        firstOutput = 499.20;
        firstCalcText = `Value is between 20,001 and 30,000: Fixed at 499.20`;
    }
    else if (value > 30000 && value <= 40000) {
        // Values for range 30,001 to 40,000
        firstOutput = 762.40;
        firstCalcText = `Value is between 30,001 and 40,000: Fixed at 762.40`;
    }
    else if (value > 40000 && value <= 50000) {
        // Values for range 40,001 to 50,000
        firstOutput = 1086.00;
        firstCalcText = `Value is between 40,001 and 50,000: Fixed at 1,086.00`;
    }
    else if (value > 50000 && value <= 75000) {
        // Values for range 50,001 to 75,000
        firstOutput = 1742.40;
        firstCalcText = `Value is between 50,001 and 75,000: Fixed at 1,742.40`;
    }
    else if (value > 75000 && value <= 100000) {
        // Values for range 75,001 to 100,000
        firstOutput = 2395.00;
        firstCalcText = `Value is between 75,001 and 100,000: Fixed at 2,395.00`;
    }
    else if (value > 100000 && value <= 150000) {
        // Values for range 100,001 to 150,000
        firstOutput = 3539.60;
        firstCalcText = `Value is between 100,001 and 150,000: Fixed at 3,539.60`;
    }
    else if (value > 150000 && value <= 200000) {
        // Values for range 150,001 to 200,000
        firstOutput = 4791.60;
        firstCalcText = `Value is between 150,001 and 200,000: Fixed at 4,791.60`;
    }
    else if (value > 200000 && value <= 250000) {
        // Values for range 200,001 to 250,000
        firstOutput = 6588.60;
        firstCalcText = `Value is between 200,001 and 250,000: Fixed at 6,588.60`;
    }
    else if (value > 250000 && value <= 300000) {
        // Values for range 250,001 to 300,000
        firstOutput = 8385.00;
        firstCalcText = `Value is between 250,001 and 300,000: Fixed at 8,385.00`;
    }
    else if (value > 300000 && value <= 400000) {
        // Values for range 300,001 to 400,000
        firstOutput = 11180.40;
        firstCalcText = `Value is between 300,001 and 400,000: Fixed at 11,180.40`;
    }
    else if (value > 400000 && value <= 500000) {
        // Values for range 400,001 to 500,000
        firstOutput = 14973.80;
        firstCalcText = `Value is between 400,001 and 500,000: Fixed at 14,973.80`;
    }
    else if (value > 500000 && value <= 750000) {
        // Values for range 500,001 to 750,000
        firstOutput = 16788.75;
        firstCalcText = `Value is between 500,001 and 750,000: Fixed at 16,788.75`;
    }
    else if (value > 750000 && value <= 1000000) {
        // Values for range 750,001 to 1,000,000
        firstOutput = 18603.80;
        firstCalcText = `Value is between 750,001 and 1,000,000: Fixed at 18,603.80`;
    }
    else if (value > 1000000 && value <= 2000000) {
        // Values for range 1,000,001 to 2,000,000
        firstOutput = 27500.00;
        firstCalcText = `Value is between 1,000,001 and 2,000,000: Fixed at 27,500.00`;
    }
    else {
        // Calculate for values above 2,000,000
        firstOutput = (value * 0.1716).toFixed(2);
        firstCalcText = `${value} × 17.16% = ${firstOutput}`;
    }
    
    // Apply different rules for sixth output based on value range
    if (value < 1000) {
        sixthOutput = 100;
        sixthCalcText = `Fixed value (below 1,000 range)`;
    } 
    else if (value >= 1000 && value <= 5000) {
        sixthOutput = 100;
        sixthCalcText = `Fixed value (1,000-5,000 range)`;
    } 
    else if (value > 5000 && value <= 9999) {
        sixthOutput = 200;
        sixthCalcText = `Fixed value (5,001-9,999 range)`;
    }
    else if (value >= 10000 && value <= 14999) {
        sixthOutput = 300;
        sixthCalcText = `Fixed value (10,000-14,999 range)`;
    }
    else if (value >= 15000 && value <= 20000) {
        sixthOutput = 300;
        sixthCalcText = `Fixed value (15,000-20,000 range)`;
    }
    else if (value > 20000 && value <= 50000) {
        sixthOutput = 400;
        sixthCalcText = `Fixed value (20,001-50,000 range)`;
    }
    else if (value > 50000 && value <= 100000) {
        sixthOutput = 500;
        sixthCalcText = `Fixed value (50,001-100,000 range)`;
    }
    else if (value > 100000 && value <= 200000) {
        sixthOutput = 600;
        sixthCalcText = `Fixed value (100,001-200,000 range)`;
    }
    else if (value > 200000 && value <= 300000) {
        sixthOutput = 700;
        sixthCalcText = `Fixed value (200,001-300,000 range)`;
    }
    else if (value > 300000 && value <= 400000) {
        sixthOutput = 800;
        sixthCalcText = `Fixed value (300,001-400,000 range)`;
    }
    else if (value > 400000 && value <= 500000) {
        sixthOutput = 900;
        sixthCalcText = `Fixed value (400,001-500,000 range)`;
    }
    else if (value > 500000 && value <= 600000) {
        sixthOutput = 1000;
        sixthCalcText = `Fixed value (500,001-600,000 range)`;
    }
    else if (value > 600000 && value <= 700000) {
        sixthOutput = 1100;
        sixthCalcText = `Fixed value (600,001-700,000 range)`;
    }
    else if (value > 700000 && value <= 800000) {
        sixthOutput = 1200;
        sixthCalcText = `Fixed value (700,001-800,000 range)`;
    }
    else if (value > 800000 && value <= 900000) {
        sixthOutput = 1300;
        sixthCalcText = `Fixed value (800,001-900,000 range)`;
    }
    else if (value > 900000 && value <= 1000000) {
        sixthOutput = 1400;
        sixthCalcText = `Fixed value (900,001-1,000,000 range)`;
    }
    else if (value > 1000000 && value <= 5000000) {
        sixthOutput = 1500;
        sixthCalcText = `Fixed value (1,000,001-5,000,000 range)`;
    }
    else if (value > 5000000 && value <= 10000000) {
        sixthOutput = 2500;
        sixthCalcText = `Fixed value (5,000,001-10,000,000 range)`;
    }
    else {
        // For values above 10,000,000
        sixthOutput = 2500;
        sixthCalcText = `Fixed value (above 10,000,000 range)`;
    }
    
    // Second output = 0.00 (fixed value)
    const secondOutput = 0.00;
    
    // Third output = same as first
    const thirdOutput = firstOutput;
    
    // Fourth output = x70% (fixed text)
    const fourthOutput = "x70%";
    
    // Fifth output = third output × 70%
    const fifthOutput = (parseFloat(thirdOutput) * 0.7).toFixed(2);
    const fifthCalcText = `${thirdOutput} × 70% = ${fifthOutput}`;
    
    // Seventh output = fifth output + sixth output
    const seventhOutput = (parseFloat(fifthOutput) + sixthOutput).toFixed(2);
    const seventhCalcText = `${fifthOutput} + ${sixthOutput} = ${seventhOutput}`;
    
    // Eighth output = same as fifth output
    const eighthOutput = fifthOutput;
    
    // Ninth output = same as sixth output
    const ninthOutput = sixthOutput;
    
    // Tenth output = same as seventh output
    const tenthOutput = seventhOutput;
    
    // Eleventh output = same as fifth output
    const eleventhOutput = fifthOutput;
    
    // Twelfth output = same as sixth output
    const twelfthOutput = sixthOutput;
    
    // Display results with updated IDs to match your HTML
    document.getElementById('tax-for1').textContent = "₱ " + parseFloat(firstOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('tax-for2').textContent = "₱ " + secondOutput.toFixed(2);
    document.getElementById('tax-for3').textContent = "₱ " + parseFloat(thirdOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('tax-for4').textContent = fourthOutput;
    document.getElementById('tax-for5').textContent = "₱ " + parseFloat(fifthOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('tax-for6').textContent = sixthOutput.toLocaleString();
    document.getElementById('equals').textContent = "₱ " + parseFloat(seventhOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('amnt').textContent = "₱ " + parseFloat(eighthOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('businessTax').textContent = "₱ " + eighthOutput.toLocaleString();
    document.getElementById('regulatoryFees').textContent = "₱ " + parseFloat(ninthOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('assessment').textContent = "₱ " + parseFloat(tenthOutput).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('uwu').textContent = twelfthOutput.toLocaleString();
}