// widget.js
(function() {
    // Create form elements
    var container = document.getElementById('widget-container');
    var form = document.createElement('form');
    var nameInput = document.createElement('input');
    var emailInput = document.createElement('input');
    var audioButton = document.createElement('button');
    var submitButton = document.createElement('button');
    var audioBlob;
    
    // Configure elements
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    nameInput.required = true;
    nameInput.name = 'name';
    
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.required = true;
    emailInput.name = 'email';
    
    audioButton.type = 'button';
    audioButton.textContent = 'Record Audio';
    
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    
    // Append elements to form
    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(audioButton);
    form.appendChild(submitButton);
    container.appendChild(form);
    
    // Handle audio recording
    var mediaRecorder;
    audioButton.onclick = function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                
                mediaRecorder.ondataavailable = function(event) {
                    audioBlob = event.data;
                    audioButton.textContent = 'Audio Recorded';
                };
                
                mediaRecorder.onstop = function() {
                    stream.getTracks().forEach(track => track.stop());
                };
                
                audioButton.textContent = 'Stop Recording';
                audioButton.onclick = function() {
                    mediaRecorder.stop();
                    audioButton.textContent = 'Record Audio';
                };
            }).catch(function(err) {
                alert('Microphone access denied: ' + err);
            });
        } else {
            alert('getUserMedia not supported on your browser!');
        }
    };
    
    // Handle form submission
    form.onsubmit = function(event) {
        event.preventDefault();
        
        // Create form data
        var formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('email', emailInput.value);
        if (audioBlob) {
            formData.append('audio', audioBlob, 'audio.webm');
        }
        
        // Send data via POST request
        fetch('http://localhost:5000/submit-form', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => alert('Form submitted successfully!'))
        .catch(error => alert('Error submitting form: ' + error));
    };
})();
