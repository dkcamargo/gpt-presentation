import PromptForm from './views/promptForm/promptForm';
import Slide from './views/customSlide/customSlide';

import Slider from "react-slick";

import './global.css'
import rivka from './assets/rivka.svg';

function App() {
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="App">
        <div className="landing-wrap">
          <h1 id="header">
            <img src={rivka} alt="Rivka Logo"/>
            <span><strong>GPT</strong> Presentation</span>
          </h1>
          <main>
            <Slider {...settings}>
              <Slide title="Code Comment Example">
                <PromptForm type="codeComment"/> 
              </Slide>
              
              <Slide title="Unit Test Example">
                <PromptForm type="unitTestCases"/> 
              </Slide>
              
              <Slide title="Commit Generator Example">
                <PromptForm type="codeCommit"/> 
              </Slide>
              
              <Slide title="Chatbot">
                <PromptForm type="chatBot"/> 
              </Slide>
            </Slider>
          </main>
        </div>
    </div>
  );
}

export default App;
