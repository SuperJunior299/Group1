document.addEventListener('DOMContentLoaded', function () {
    const pathwaySelect = document.getElementById('pathway-select');
    const selectedPathway = document.getElementById('selected-pathway');

    pathwaySelect.addEventListener('change', function () {
        selectedPathway.textContent = pathwaySelect.value + ' Pathway';
    });
});
  
document.addEventListener('DOMContentLoaded', function () {
  const pathwaySelect = document.getElementById('pathway-select');
  const selectedPathway = document.getElementById('selected-pathway');

  const levelRange = document.getElementById('level-range');
  const selectedLevel = document.getElementById('selected-level');

  pathwaySelect.addEventListener('change', function () {
    selectedPathway.textContent = pathwaySelect.value + ' Pathway';
  });

  levelRange.addEventListener('input', function () {
    const levelValue = levelRange.value;
    if (levelValue == 1) {
      selectedLevel.textContent = 'Beginner';
    } else if (levelValue == 2) {
      selectedLevel.textContent = 'Intermediate';
    } else if (levelValue == 3) {
      selectedLevel.textContent = 'Professional';
    }
  });
});


