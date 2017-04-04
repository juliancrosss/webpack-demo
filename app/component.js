//import Worker from 'worker-loader!./worker';

export default (text = 'Hello world') => {
  const element = document.createElement('div');

  element.className = 'pure-button';
  element.innerHTML  = text;

  // Attach the generated class name
  //element.className = styles.redButton;
  element.className = 'fa fa-hand-spock-o fa-1g';

  element.onclick = () => {
    import('./lazy').then((lazy) => {
      element.textContent = lazy.default;
    }).catch((err) => {
      console.error(err);
    });
  };
  
  return element;
};