import * as Viewer from './viewer.js';

const template = document._currentScript.ownerDocument.querySelector('template');
const openjscadElem = Object.create(HTMLElement.prototype);


//instantiate variables
let options, data, fileInput, viewer;

let printerDimensions = [100, 100, 100];

// Lifecycle callbacks
openjscadElem.createdCallback = function() {
    // initialize, render templates, etc.
    var t = this;
    var clone = document.importNode(template.content, true);

    t.createShadowRoot().appendChild(clone);

    console.log(document);

    const jQuery = require('jquery');
    const hammer = require('jquery-hammerjs');

    var UiWorker = require('exports?OpenJsCad!./../../js/ui-worker.js');
    var JsCadFunc = require('exports?OpenJsCad!./../../js/jscad-function.js');
    var JsCadWorker = require('exports?OpenJsCad!./../../js/jscad-worker.js');

    function Load(importObj) {
        for (var prop in importObj) {
            if (importObj.hasOwnProperty(prop)) {
                OpenJsCad[prop] = importObj[prop];
            }
        }
    }

    Load(UiWorker);
    Load(JsCadFunc);
    Load(JsCadWorker);

    console.log(OpenJsCad);

    //    require('expose?OpenJsCad!../../js/worker-conversion.js');
    console.log(OpenJsCad)
        //    CSG = require('imports?CSG=>{}!../../csg.js');

    // require('expose?OpenScad!../../openscad.js');


    //interface element declaration
    options = t.shadowRoot.querySelector('#options');
    fileInput = t.shadowRoot.querySelector('input[name="upload"]');

    viewer = new Viewer.default(printerDimensions, { file: fileInput, options: options });

};

openjscadElem.attachedCallback = function() {
    // called when element is inserted into the DOM
    // good place to add event listeners
    var t = this;
    viewer.input();

    gProcessor = new OpenJsCad.Processor(t.shadowRoot.getElementById("viewerContext"), undefined, t.shadowRoot);

};

openjscadElem.detachedCallback = function() {
    // called when element is removed from the DOM
    // good place to remove event listeners
};

openjscadElem.attributeChangedCallback = function(name, oldVal, newVal) {
    // make changes based on attribute changes
};

// Add a public method
openjscadElem.doSomething = function() {

};

document.registerElement('open-jscad', { prototype: openjscadElem });