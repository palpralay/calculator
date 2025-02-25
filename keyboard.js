document.addEventListener('DOMContentLoaded', () => {
    // Keyboard to button mapping configuration
    const keyMap = {
      'Enter': { type: 'icon', value: 'fa-equals' },
      'Backspace': { type: 'text', value: 'DEL' },
      'Escape': { type: 'text', value: 'AC' },
      'Delete': { type: 'text', value: 'AC' },
      'c': { type: 'text', value: 'AC' },
      'C': { type: 'text', value: 'AC' },
      '+': { type: 'icon', value: 'fa-plus' },
      '-': { type: 'icon', value: 'fa-minus' },
      '*': { type: 'icon', value: 'fa-xmark' },
      '/': { type: 'icon', value: 'fa-divide' },
      '%': { type: 'icon', value: 'fa-percent' },
      '.': { type: 'text', value: '.' },
      '0': { type: 'text', value: '0' },
      '1': { type: 'text', value: '1' },
      '2': { type: 'text', value: '2' },
      '3': { type: 'text', value: '3' },
      '4': { type: 'text', value: '4' },
      '5': { type: 'text', value: '5' },
      '6': { type: 'text', value: '6' },
      '7': { type: 'text', value: '7' },
      '8': { type: 'text', value: '8' },
      '9': { type: 'text', value: '9' }
    };
  
    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
      const keyConfig = keyMap[e.key];
      if (!keyConfig) return;
  
      e.preventDefault();
      const buttons = Array.from(document.querySelectorAll('pralay-button'));
  
      // Find matching button
      const targetButton = buttons.find(button => {
        if (keyConfig.type === 'text') {
          return button.textContent.trim() === keyConfig.value;
        }
        if (keyConfig.type === 'icon') {
          const icon = button.querySelector('i');
          return icon && icon.classList.contains(keyConfig.value);
        }
        return false;
      });
  
      if (targetButton) {
        targetButton.click();
        targetButton.classList.add('active');
        setTimeout(() => targetButton.classList.remove('active'), 100);
      }
    });
  
    // Add visual feedback for physical button presses
    document.addEventListener('keydown', (e) => {
      if (keyMap[e.key] && !e.repeat) {
        const buttons = document.querySelectorAll('pralay-button');
        buttons.forEach(button => button.classList.remove('key-press'));
      }
    });
  });