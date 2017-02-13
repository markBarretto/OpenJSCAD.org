import Viewer from './viewer.js';

let jQuery = require('jquery');
let hammer = require('jquery-hammerjs');

let ace = require('brace');
let CSG = require('./lib/csg.js');

import GL from './lib/lightgl.js';

let OpenScad = require('./../../node_modules/jscad/openscad.js');
//let OpenScad = require('./lib/openscad.js');
//let OpenJsCad = require('imports?GL=>GL&OpenJsCad=>undefined!exports?OpenJsCad!./../../node_modules/jscad/openjscad.js');

//let OpenJsCad = require("exports?OpenJsCad!./lib/openjscad.js")
let OpenJsCad = require('./lib/openjscad.js');
//let OpenJsCad = require('imports?_includePath=>"/lib"!./lib/openjscad.js');

//var gProcessor = require('./utils.js').gProcessor;

window.onload = function loadProcessor() {
	gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));

    //imports additional properties and methods found in other files
    require('./lib/extensions/jscad-worker.js');
    require('./lib/extensions/jscad-function.js');

    let gEditor = require('imports?gEditor=>gEditor!./lib/extensions/ui-editor.js');

    require("imports?gProcessor=>gProcessor!./lib/extensions/ui-worker.js");
    
    console.log(gProcessor);
    console.log(gEditor);
    //require('./lib/extensions/ui-drag-drop.js');
}

       var fileInput = document.querySelector('input[name="upload"]');

        function appendModel(){
            handleFiles(fileInput.files);
        }

        fileInput.addEventListener('change', appendModel);

        function handleFiles(files) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.addEventListener("load", function () {

                var worker = OpenJsCad.createConversionWorker();
                var u = gProcessor.baseurl;
                
                worker.postMessage({baseurl: u, source: reader.result, filename: files[0].name, cache: true});
             //   src = reader.result;
             //   console.log(src);
             //   console.log(file);           
            }, false);
            
            if(file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
                reader.readAsBinaryString(file,"UTF-8");
            } else {
                reader.readAsText(file,"UTF-8");
            }

          }
        }

        function loadProcessor() {
            gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));
        }

