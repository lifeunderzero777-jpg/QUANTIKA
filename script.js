// script.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navContent = document.getElementById('nav-content');

  if (navToggle && navContent) {
    navToggle.addEventListener('click', () => {
      navContent.classList.toggle('hidden');
    });
  }
});
    // Simple Calculator Logic
    document.addEventListener('DOMContentLoaded', () => {
      const display = document.getElementById('display');
      const errorMessage = document.getElementById('error-message');
      const buttons = document.querySelectorAll('.calc-button[data-type]');

      let currentInput = '0';
      let firstOperand = null;
      let operator = null;
      let waitingForSecondOperand = false;

      // Function to show a temporary error message
      function showMessage(message, element) {
        element.textContent = message;
        element.classList.remove('hidden');
        setTimeout(() => {
          element.classList.add('hidden');
        }, 3000);
      }

      // Function to update the display
      function updateDisplay() {
        display.value = currentInput;
      }

      // Function to reset the calculator state
      function resetCalculator() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
      }

      // Function to handle number and decimal input
      function inputDigit(digit) {
        if (waitingForSecondOperand) {
          currentInput = digit;
          waitingForSecondOperand = false;
        } else {
          currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
        updateDisplay();
      }

      // Function to handle the decimal point
      function inputDecimal(dot) {
        if (waitingForSecondOperand) {
          currentInput = '0' + dot;
          waitingForSecondOperand = false;
          return;
        }
        if (!currentInput.includes(dot)) {
          currentInput += dot;
        }
        updateDisplay();
      }

      // Function to handle operator selection
      function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
          operator = nextOperator;
          return;
        }

        if (firstOperand === null) {
          firstOperand = inputValue;
        } else if (operator) {
          const result = performCalculation();
          if (result === 'Error') return;
          currentInput = `${parseFloat(result.toFixed(7))}`;
          firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay();
      }

      // Function to perform the calculation
      function performCalculation() {
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
          case '+':
            result = firstOperand + secondOperand;
            break;
          case '-':
            result = firstOperand - secondOperand;
            break;
          case '*':
            result = firstOperand * secondOperand;
            break;
          case '/':
            if (secondOperand === 0) {
              showMessage("Cannot divide by zero!", errorMessage);
              resetCalculator();
              return 'Error';
            }
            result = firstOperand / secondOperand;
            break;
          default:
            return secondOperand;
        }
        return result;
      }

      // Function to handle button clicks for both calculators
      buttons.forEach(button => {
        button.addEventListener('click', (event) => {
          const { type, value } = event.target.dataset;

          // Simple calculator logic
          if (type === 'number') {
            inputDigit(value);
          } else if (type === 'operator') {
            handleOperator(value);
          } else if (type === 'decimal') {
            inputDecimal(value);
          } else if (type === 'equals') {
            if (operator && firstOperand !== null) {
              const result = performCalculation();
              if (result !== 'Error') {
                currentInput = `${parseFloat(result.toFixed(7))}`;
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                updateDisplay();
              }
            }
          } else if (type === 'clear') {
            resetCalculator();
            updateDisplay();
          } else if (type === 'delete') {
            if (currentInput.length > 1) {
              currentInput = currentInput.slice(0, -1);
            } else {
              currentInput = '0';
            }
            updateDisplay();
          }
        });
      });

      // Handle keyboard input for the simple calculator
      document.addEventListener('keydown', (event) => {
        const key = event.key;
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const operators = ['+', '-', '*', '/'];

        if (numbers.includes(key)) {
          inputDigit(key);
        } else if (operators.includes(key)) {
          handleOperator(key);
        } else if (key === '.') {
          inputDecimal(key);
        } else if (key === 'Enter' || key === '=') {
          if (operator && firstOperand !== null) {
            const result = performCalculation();
            if (result !== 'Error') {
              currentInput = `${parseFloat(result.toFixed(7))}`;
              firstOperand = null;
              operator = null;
              waitingForSecondOperand = false;
              updateDisplay();
            }
          }
        } else if (key === 'Backspace' || key === 'Delete') {
          if (currentInput.length > 1) {
            currentInput = current.slice(0, -1);
          } else {
            currentInput = '0';
          }
          updateDisplay();
        } else if (key === 'Escape') {
          resetCalculator();
          updateDisplay();
        }
      });
    });

    // Mobile Nav Logic
    document.getElementById('nav-toggle').addEventListener('click', function () {
      var navContent = document.getElementById('nav-content');
      navContent.classList.toggle('hidden');
    });

    // 3D Butterfly Logic
    window.onload = function () {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create the butterfly group
      const butterfly = new THREE.Group();

      // Body (Cylinder)
      const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 8);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      butterfly.add(body);

      // Left Wings (Box)
      const wingGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
      const wingMaterial = new THREE.MeshLambertMaterial({ color: 0xffa500 });
      const leftWing1 = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing1.position.set(-0.75, 0.25, 0);
      const leftWing2 = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing2.position.set(-0.75, -0.25, 0);

      const leftWingsGroup = new THREE.Group();
      leftWingsGroup.add(leftWing1);
      leftWingsGroup.add(leftWing2);
      leftWingsGroup.position.x = -0.25;
      leftWingsGroup.rotation.y = Math.PI / 2;
      butterfly.add(leftWingsGroup);

      // Right Wings (Box)
      const rightWing1 = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing1.position.set(0.75, 0.25, 0);
      const rightWing2 = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing2.position.set(0.75, -0.25, 0);

      const rightWingsGroup = new THREE.Group();
      rightWingsGroup.add(rightWing1);
      rightWingsGroup.add(rightWing2);
      rightWingsGroup.position.x = 0.25;
      rightWingsGroup.rotation.y = -Math.PI / 2;
      butterfly.add(rightWingsGroup);

      // Position and scale the butterfly
      butterfly.rotation.y = Math.PI / 2;
      butterfly.position.set(0, 0, -20);
      butterfly.scale.set(0.5, 0.5, 0.5);
      scene.add(butterfly);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      camera.position.z = 5;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        // Make the wings flap
        const wingFlap = Math.sin(Date.now() * 0.005) * Math.PI / 6;
        leftWingsGroup.rotation.y = Math.PI / 2 + wingFlap;
        rightWingsGroup.rotation.y = -Math.PI / 2 - wingFlap;

        // Make the butterfly fly
        butterfly.position.z += 0.05;
        if (butterfly.position.z > 5) {
          butterfly.position.z = -20;
          butterfly.position.x = (Math.random() - 0.5) * 10;
          butterfly.position.y = (Math.random() - 0.5) * 10;
        }

        renderer.render(scene, camera);
      };

      // Handle window resizing
      window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });

      animate();
    };

