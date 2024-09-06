function processCrystals(arr) {
    const targetThickness = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let currentThickness = arr[i];
        console.log(`Processing chunk ${currentThickness} microns`);

        currentThickness = performOperation(currentThickness, targetThickness, 'Cut', thickness => thickness / 4);
        currentThickness = performOperation(currentThickness, targetThickness, 'Lap', thickness => thickness * 0.8);
        currentThickness = performOperation(currentThickness, targetThickness, 'Grind', thickness => thickness - 20);
        currentThickness = performOperation(currentThickness, targetThickness, 'Etch', thickness => thickness - 2);

        // X-ray can only be applied once, and only if it's needed
        if (currentThickness + 1 === targetThickness) {
            currentThickness += 1;
            console.log(`X-ray x1`);
        }

        // Ensure the crystal has reached the target thickness
        console.log(`Finished crystal ${currentThickness} microns`);
    }

    function performOperation(thickness, target, operationName, operationFunc) {
        let operationCount = 0;

        // Apply the operation until it no longer makes sense
        while (operationFunc(thickness) >= target || Math.floor(operationFunc(thickness)) === target) {
            thickness = operationFunc(thickness);
            operationCount++;
        }

        // If any operation was performed, print the details and wash the crystal
        if (operationCount > 0) {
            console.log(`${operationName} x${operationCount}`);
            thickness = Math.floor(thickness);
            console.log(`Transporting and washing`);
        }

        return thickness;
    }
}

// Example usage:
processCrystals([1375, 50000]);