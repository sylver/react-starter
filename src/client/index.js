import webpacklogo from './content/webpack.svg';
import './styles/main.scss';
import './styles/test.sass';

function component() {
    var element = document.createElement('div');
    element.innerHTML = "Hello world!";

    var logo = new Image();
    logo.src = webpacklogo;
    element.appendChild(logo);

    return element;
}

document.body.appendChild(component());