const addEvent = function( obj, type, fn ) {
  if (obj.addEventListener) {
    obj.addEventListener( type, fn, false );
  }
  else if (obj.attachEvent) {
    obj['e' + type + fn] = fn;
    obj.attachEvent( 'on' + type, function() {
      obj['e' + type + fn]();
    });
  }
};

const removeEvent = function( obj, type, fn ) {
  if (obj.removeEventListener) {
    obj.removeEventListener( type, fn, false );
  }
  else if (obj.detachEvent) {
    obj.detachEvent( 'on' + type, obj['e' + type + fn] );
    obj['e' + type + fn] = null;
  }
};

module.exports = {
  addEvent,
  removeEvent,
};