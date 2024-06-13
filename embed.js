(function() {
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/react/umd/react.production.min.js';
    document.head.appendChild(script);
  
    script.onload = function() {
      var script2 = document.createElement('script');
      script2.src = 'https://unpkg.com/react-dom/umd/react-dom.production.min.js';
      document.head.appendChild(script2);
  
      script2.onload = function() {
        var appDiv = document.createElement('div');
        appDiv.id = 'react-widget';
        document.body.appendChild(appDiv);
  
        var script3 = document.createElement('script');
        script3.src = './static/js/main.js'; // Points to your built main.js
        document.body.appendChild(script3);
      };
    };
  })();
  