
import React, { useEffect, useRef, useState } from 'react';
import '../styles/homePageStyles.css';

function HomePage() {



// INITIAL SETUP
    
    const terminalTextContents = [
      ' intro_script.run()',
      'Hey there!',
      'My name is SARAH SCHMOLLER',
      'I write software that tells stories',
      '\n',
      `<a href="#workPageContainer" style="color:inherit;text-decoration:underline;">## View my work -> ##</a>`,
      '\n',
      '> █'
    ];

    const [typedTexts, setTypedTexts] = useState(() => {
      const initialTexts = Array(terminalTextContents.length).fill('');
      initialTexts[0] = '>';
      return initialTexts;
    });



// ON-LOAD EFFECTS

  // Handle header display settings on scroll
  useEffect(() => {

    document.getElementById("currentTime").textContent = updateTime();
    let header = document.getElementById('headerWrapper');
    let headerMobile = document.getElementById('outerHeaderMobile');

    let introPage = document.getElementById('introPage');
    let introPageMobile = document.getElementById('introPageMobile');

    let contactPage = document.getElementById('contactPage');
    let lastScrollY = window.scrollY;

    isMobile = false;
    if (isMobile) {

      handleMobileMenu()

      let innerHeader = document.getElementById('headerMobile');
  
      if (!introPage.classList.contains('noDisplay')) {
        introPage.classList.toggle('noDisplay');
      }
  
      if (introPageMobile.classList.contains('noDisplay')) {
        introPageMobile.classList.toggle('noDisplay');
      }

      if (!header.classList.contains('noDisplay')) {
        header.classList.toggle('noDisplay');
      }
  
      if (headerMobile.classList.contains('noDisplay')) {
        headerMobile.classList.toggle('noDisplay');
      }

      if (!contactPage.classList.contains('staticPosition')) {
        contactPage.classList.toggle('staticPosition');
      }

      if (contactPage.classList.contains('stickyPosition')) {
        contactPage.classList.toggle('stickyPosition');
      }

      const messageContainer = document.getElementById('mobileLayoutMessageContainerLink');

      if (messageContainer) {

        messageContainer.addEventListener('click', (event) => {

          messageContainer.classList.toggle('highlight');

          setTimeout(() => {
            messageContainer.classList.toggle('highlight');
          }, 500);
        });
      }

      const scrollHandler = () => {
        lastScrollY = scrollEffectMobile(lastScrollY, innerHeader);
      };

      window.addEventListener('scroll', scrollHandler);

      const handleHashChange = () => {
        const id = window.location.hash.replace('#', '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('hashchange', handleHashChange);
      };
  
    } else {

      let innerHeader = document.getElementById('header');
      
      if (!introPageMobile.classList.contains('noDisplay')) {
        introPageMobile.classList.toggle('noDisplay');
      }
  
      if (introPage.classList.contains('noDisplay')) {
        introPage.classList.toggle('noDisplay');
      }

      if (!headerMobile.classList.contains('noDisplay')) {
        headerMobile.classList.toggle('noDisplay');
      }
  
      if (header.classList.contains('noDisplay')) {
        header.classList.toggle('noDisplay');
      }

      if (contactPage.classList.contains('staticPosition')) {
        contactPage.classList.toggle('staticPosition');
      }

      if (!contactPage.classList.contains('stickyPosition')) {
        contactPage.classList.toggle('stickyPosition');
      }

      typeEffect();

      const body = document.getElementById('body');
      
      const laptopButtonContainer = document.getElementById('laptopLayoutButtonContainer');
      const headerButtons = document.querySelectorAll('.headerButton img');

    const scrollHandler = () => {
      lastScrollY = scrollEffect(lastScrollY, body, innerHeader, introPage, laptopButtonContainer, headerButtons);
    };

    window.addEventListener('scroll', scrollHandler);

    const handleHashChange = () => {
      const id = window.location.hash.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('hashchange', handleHashChange);
    };
  
    }
  }, []);
  


// STANDARD HANDLING HELPER FUNCTIONS

  // Handling to take place during scroll events
  function scrollEffect(lastScrollY, body, header, introPage, laptopButtonContainer, headerButtons) {

    const laptopButtonPosition = getDistanceFromTop(laptopButtonContainer);
    const bodyWidth = body.getBoundingClientRect().width;

    function getDistanceFromTop(element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    }

    let laptopButton = laptopButtonContainer.children[0];
    let transitionEnd;
    let translateX, targetPositionY, scale;

    const currentScrollY = window.pageYOffset;

    // In the case that we are scrolling up, and we're also further down than the intro page...
    if (currentScrollY >= introPage.offsetHeight && currentScrollY < lastScrollY) {

      // If the header is not visible, set it to visible
      if (!header.classList.contains('visibleHeader')) {
        header.classList.toggle('visibleHeader');
      }

      // Double check that the header is not set to hidden
      if (header.classList.contains('hiddenHeader')) {
        header.classList.toggle('hiddenHeader');
      }

      // Double check that the header is not set to retracted
      if (header.classList.contains('retractedHeader')) {
        header.classList.toggle('retractedHeader');
        header.style.top = `0px`;
      }
      
      // Double check that the individual buttons are not set to retracted
      if (headerButtons[0].classList.contains('retractedHeaderButton')) {
        headerButtons.forEach((button) => {
          if (button.classList.contains('retractedHeaderButton')) {
            button.classList.toggle('retractedHeaderButton');
          }
        })
      }
      
    // In the case that we're scrolling down, and we're also further down than the intro page...
    } else if (currentScrollY >= introPage.offsetHeight && currentScrollY > lastScrollY && currentScrollY >= 5) {

      // If the header is not hidden, set it to hidden
      if (!header.classList.contains('hiddenHeader')) {
        header.classList.toggle('hiddenHeader');
      }

      // Double check that the header is not set to visible
      if (header.classList.contains('visibleHeader')) {
        header.classList.toggle('visibleHeader');
      }

      // Double check that the header is not set to retracted
      if (header.classList.contains('retractedHeader')) {
        header.classList.toggle('retractedHeader');
        header.style.top = `0px`;
      }

      // Double check that the individual buttons are not set to retracted
      if (headerButtons[0].classList.contains('retractedHeaderButton')) {
        headerButtons.forEach((button) => {
          if (button.classList.contains('retractedHeaderButton')) {
            button.classList.toggle('retractedHeaderButton');
          }
        });
      }
      
    // In the case that we've reached the intro page and the header is visible...
    } else if (currentScrollY <= (introPage.offsetHeight * 0.7) && header.classList.contains('visibleHeader')) {

      // If the header is not retracted, set it to retracted
      if (!header.classList.contains('retractedHeader')) {
        header.classList.toggle('retractedHeader');
        targetPositionY = laptopButtonPosition - 25;
        header.style.top = `${targetPositionY}px`;
      }

      // Double check that the header is not set to visible
      if (header.classList.contains('visibleHeader')) {
        header.classList.toggle('visibleHeader');
      }

      // Double check that the header is not set to hidden
      if (header.classList.contains('hiddenHeader')) {
        header.classList.toggle('hiddenHeader');
      }

      // Iterate through all the buttons in the header bar
      headerButtons.forEach((button) => {

        // Set the values we need to retract the buttons from the regular header into the nav bar on the laptop image
        translateX = button.id == "headerHomeButton" ? (bodyWidth / 2) - 142 : -((bodyWidth / 2) - 142);
        scale = laptopButton.getBoundingClientRect().height / headerButtons[0].height;

        // If the button in question is not retracted, set it to retracted
        if (!button.classList.contains('retractedHeaderButton')) {
          button.classList.toggle('retractedHeaderButton');
        }

        // Apply the transformation to retract the button into the nav bar on the laptop image
        button.style.transform = `translate(${translateX}px) scale(${scale})`;

        // Get a reference to the type of transition event used by the browser for use later
        transitionEnd = whichTransitionEvent();
        
      });

      // If the header is not set to visible or to hidden...
      if (!header.classList.contains('visibleHeader') && !header.classList.contains('hiddenHeader')) {

        // After the transition animation retracting the header buttons into the nav bar is done running...
        headerButtons[4].addEventListener(transitionEnd, () => {

          // If the header is not hidden, set it to hidden
          if (!header.classList.contains('hiddenHeader')) {
            header.classList.toggle('hiddenHeader');
          }

          // Double check that the header is not set to visible
          if (header.classList.contains('visibleHeader')) {
            header.classList.toggle('visibleHeader');
          }

          // Double check that the header is not set to retracted
          if (header.classList.contains('retractedHeader')) {
            header.classList.toggle('retractedHeader');
            header.style.top = `0px`;
          }
  
          // Double check each of the header buttons as well, and make sure that they are no longer set to retracted
          headerButtons.forEach((button) => {
            button.style.transform = '';
            if (button.classList.contains('retractedHeaderButton')) {
              button.classList.toggle('retractedHeaderButton');
            }
          });
        });
      }
    }

    lastScrollY = currentScrollY;
    return lastScrollY;
  };


  // Handling for the typing effect in the laptop layout
  function typeEffect() {
    let charIndex = 0;
    let lineIndex = 0;
  
    const typeChar = () => {
      if (lineIndex < terminalTextContents.length) {
        const currentLine = terminalTextContents[lineIndex];

        const boldStart = currentLine.indexOf("SARAH SCHMOLLER");
        const boldEnd = boldStart + "SARAH SCHMOLLER".length;

        const underlineStart = currentLine.indexOf("View my work ->");
        const underlineEnd = underlineStart + "View my work ->".length;
  
        if (charIndex < currentLine.length) {
          const nextChar = currentLine[charIndex];
  
          setTypedTexts((prev) => {
            const newTypedTexts = [...prev];
            // Check if the character is in the bold range
            if (boldStart !== -1 && charIndex >= boldStart && charIndex < boldEnd) {
              newTypedTexts[lineIndex] += `<strong>${nextChar}</strong>`;
            } else if (underlineStart !== -1 && charIndex >= underlineStart && charIndex < underlineEnd) {
              newTypedTexts[lineIndex] += `<u>${nextChar}</u>`;
            } else {
              newTypedTexts[lineIndex] += nextChar;
            }

            return newTypedTexts;
          });
  
          charIndex++;
          let delay = lineIndex === 0 ? 70 : 1;
          setTimeout(typeChar, delay); // Adjust typing speed (50ms delay between characters)
        } else {
          charIndex = 0;
          lineIndex++;
          let delay = lineIndex === 0 ? 300 : 80;
          setTimeout(typeChar, delay); // Delay before starting the next line
        }
      }
    };

    typeChar();
  }


  // Detect which type of transition event is used by the browser
  function whichTransitionEvent() {

    // Create a fake element with an arbitrary name
    let el = document.createElement('fakeelement');

    // Map transition property names from different vendors to the appropriate events
    let transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    // Loop through the possible transitions and check whether the browser supports each one
    for (let t in transitions){
      if (el.style[t] !== undefined){

        // Return the first transition in the list supported by the browser
        return transitions[t];
      }
    }
  }



// MOBILE HANDLING HELPER FUNCTIONS

  // Helper function to detect mobile device use
  function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }


  // Handling to take place during scroll events on mobile devices
  function scrollEffectMobile(lastScrollY, header) {
    
    const currentScrollY = window.pageYOffset;

    // In the case that we are scrolling up, and we're also further down than the intro page...
    if (currentScrollY < lastScrollY) {

      // If the header is not visible, set it to visible
      if (!header.classList.contains('visibleHeader')) {
        header.classList.toggle('visibleHeader');
      }

      // Double check that the header is not set to hidden
      if (header.classList.contains('hiddenHeader')) {
        header.classList.toggle('hiddenHeader');
      }
      
    // 
    } else if (currentScrollY > lastScrollY) {

      // If the header is not hidden, set it to hidden
      if (!header.classList.contains('hiddenHeader')) {
        header.classList.toggle('hiddenHeader');
      }

      // Double check that the header is not set to visible
      if (header.classList.contains('visibleHeader')) {
        header.classList.toggle('visibleHeader');
      }

    }

    lastScrollY = currentScrollY;
    return lastScrollY;

  }

  function handleMobileMenu() {
    const menuLinks = document.querySelectorAll('.dropdown-content a');
    const menuToggle = document.getElementById('menuToggle');
  
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.checked = false;
      });
    });
  }
  

  // Update the time display on the intro page for mobile devices
  function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    
    return formattedTime;
  }



// HTML FORMATTING

  return (
    <div id='body'>
      <div id='canvas'></div>


      {/* HEADER */}
      <div id='headerWrapper'>
        <div id='header' class='header hiddenHeader'>
          <nav id='headerButtonNav'>
            <div id='headerButtonDiv'>
              <ol id='headerButtonList'>
                <div class='alignLeft'>
                  <a class='headerButton' href='.'>
                    <img class='headerButtonImage' id='headerHomeButton' src='./homeButton.png' alt='Home' />
                  </a>
                </div>
                <div class='alignRight'>
                  <a class='headerButton' href='#aboutPage'>
                    <img class='headerButtonImage' src='./aboutButton.png' alt='About' />
                  </a>
                  <a class='headerButton' href='#workPageContainer'>
                    <img class='headerButtonImage' src='./workButton.png' alt='Work' />
                  </a>
                  <a class='headerButton' href='#pageFooter'>
                    <img class='headerButtonImage' src='./contactButton.png' alt='Contact' />
                  </a>
                  <a class='headerButton' href='#resumePage'>
                    <img class='headerButtonImage' src='./resumeButton.png' alt='Resume' />
                  </a>
                </div>
              </ol>
            </div>
          </nav>
        </div>
      </div>


      {/* HEADER MOBILE */}
      <div id="outerHeaderMobile">
        <div id="headerMobile" class="innerHeaderMobile hiddenHeader">
          <nav id="buttonNav">
            <nav id="buttonDiv">
              <ol id="              let header = document.getElementById('header');
              // ...
              if (!header.classList.contains('visibleHeader')) {
                header.classList.toggle('visibleHeader');
              }">
                <div class="alignRight">
                <label for="menuToggle" id="menuIcon">
                  <img class="homeButtonHeader" id="homeButtonHeaderRight" src="./hamburgerMenu.png" alt="Menu" />
                </label>
                </div>
              </ol>
            </nav>
          </nav>
        </div>
      </div>
      <div>
        <input type="checkbox" id="menuToggle" class="menuToggle" hidden />
        <div id="dropdownMenu" class="dropdown-content">
          <label for="menuToggle" class="closeMenu">
            <span>&#215;</span>
          </label>
          <a class="list" href="."><span>Home</span></a>
          <a class="list" href="#aboutPage"><span>About</span></a>
          <a class="list" href="#workPage"><span>Work</span></a>
          <a class="list" href="#contactPage"><span>Contact</span></a>
          <a class="list" href="#resumePage"><span>Resume</span></a>
        </div>
      </div>


      {/* INTRO PAGE */}
      <div id="introPage">
        <div id="laptopLayoutContainer">
          <div id="laptopLayoutLightRadius"></div>
          <img id="laptopLayoutImage" src="./introImage.png"/>
          <div id="laptopLayoutTerminal">
            {typedTexts.map((text, idx) => (
              <div
                key={idx}
                className={`laptopLayoutTerminalText terminalLine${idx === typedTexts.length - 1 ? ' typing' : ''}`}
                style={{ top: `${1.75 * idx}%` }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
          <div id="laptopLayoutButtonContainer">
            <a id="laptopLayoutHomeButton" href="." ><img src="./homeButton.png" alt="Home"/></a>
            <a id="laptopLayoutAboutButton" href="#aboutPage"><img src="./aboutButton.png" alt="About"/></a>
            <a id="laptopLayoutWorkButton" href="#workPageContainer"><img src="./workButton.png" alt="Work"/></a>
            <a id="laptopLayoutContactButton" href="#pageFooter"><img src="./contactButton.png" alt="Contact"/></a>
            <a id="laptopLayoutResumeButton" href="#resumePage"><img src="./resumeButton.png" alt="Resume"/></a>
          </div>
        </div>
        <svg id="introPageNavArrow" viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <a id="introPageNavArrowLink" href="#aboutPage">
            <rect x="680" y="0" width="80" height="80" fill="transparent"></rect>     
            <g class="introPageScrollIndicator" transform="translate(710, 0)">
              <path d="M6 8L12 16L18 8H6Z" fill="#7a839c"></path>
            </g>
          </a>
        </svg>
        <svg class="svgWhiteTab" id="introPageTab" viewBox="0 0 1440 57" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path d="M0 57C0 57 218.416 0 693.5 0C1168.58 0 1440 57 1440 57H0Z" transform="translate(432, 0) scale(0.4, 1)"></path>
        </svg>
      </div>


      {/* INTRO PAGE MOBILE*/}
      <div id="introPageMobile">
        <div id="mobileLayoutContainer">
          <img id="profileImage" src="./profileImage.png" alt="Profile Image"/>
          <div id="mobileLayoutTitle"><span>Sarah Schmoller</span></div>
          <div id="mobileLayoutButtonContainer">
            <a id="aboutButton" class="mobileButton" href="#aboutPage"><img src="./aboutButton.png" alt="About"/></a>
            <a id="workButton" class="mobileButton" href="#workPageContainer"><img src="./workButton.png" alt="Work"/></a>
            <a id="contactButton" class="mobileButton" href="#pageFooter"><img src="./contactButton.png" alt="Contact"/></a>
            <a id="resumeButton" class="mobileButton" href="#resumePage"><img src="./resumeButton.png" alt="Resume"/></a>
          </div>
          <div id="messagesTitle"></div>
          <div id="label">
            <span>Messages</span>
          </div>
          <div id="divider" class="horizontalLine"></div>
          <div id="mobileLayoutMessageContainer">
            <a id="mobileLayoutMessageContainerLink" href="#workPageContainer">
              <div id="profileAndTextWrapper">
                <img id="profileImageMessage" src="./profileImageMessage.png" alt="Profile Image"/>
                <div class="messageWrapper">
                  <div id="senderName">
                    <span>Sarah Schmoller</span>
                  </div>
                  <div id="timestamp">
                    <span id="currentTime"></span>
                  </div>
                  <div id="message">
                    <span>Hey there! My name is Sarah. I write software that tells stories. Tap here to see my work -></span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <svg id="introPageNavArrow" viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <a id="introPageNavArrowLink" href="#aboutPage">
            <rect x="680" y="0" width="80" height="80" fill="transparent"></rect>     
            <g class="introPageScrollIndicator" transform="translate(710, 0)">
              <path d="M6 8L12 16L18 8H6Z" fill="#7a839c"></path>
            </g>
          </a>
        </svg>
        <svg class="svgWhiteTab" id="introPageTab" viewBox="0 0 1440 57" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path d="M0 57C0 57 218.416 0 693.5 0C1168.58 0 1440 57 1440 57H0Z" transform="translate(432, 0) scale(0.4, 1)"></path>
        </svg>
      </div>


      {/* ABOUT PAGE */}
      <div id="aboutPage">
        <div id="aboutPageImageContainer">
          <img id="aboutImage" src="./aboutImage.png" />
        </div>
        <div id="aboutPageTextContainer">
          <div id="aboutTitle" className="titleText">
            <span>About Me</span>
          </div>
          <div id="aboutParagraph" className="paragraphText">
            <span>Hi! I'm Sarah Schmoller, a software engineer specializing in natural language technologies. My passion lies in creating software that brings written content to life.</span>
          </div>
          <div id="aboutParagraph" className="paragraphText">
            <span>The work I do encompasses a wide range of AI language generation techniques, from rules-engines to LLMs. I am well-versed in AWS's cloud computing, databasing, serverless, and API creation capabilities, allowing me to build out complex natural language generation tools from start to finish. Over the course of my career I've consistently worked with major consumer-facing publications, releasing highly visible automated publishing frameworks, authorial assist tools, audio summaries, and more.  </span>
          </div>
          <div id="aboutParagraph" className="paragraphText">
            <span>I earned my Bachelor's in Computer Science and Linguistics from the University of Minnesota and am currently working at Dow Jones, where I deal in AI-generated news media for MarketWatch, Barrons.com, Newswires, and the Wall Street Journal. In my free time you'll often find me travelling or volunteering with animals.</span>
          </div>
        </div>
      </div>


      {/* WORK PAGE */}
      <div id="workPage">
        <svg class="svgWhiteTab" id="workPageTab" viewBox="0 0 1440 57" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          <path d="M0 57C0 57 218.416 0 693.5 0C1168.58 0 1440 57 1440 57H0Z" transform="translate(432, 57) scale(0.4, -1)"></path>
        </svg>
        <div id="workPageContainer">
          <div id="workPageText">
            <div id="workPageTitle" className="titleText"><span>My Work</span></div>
            <div id="workPageParagraph" className="paragraphText"><span>As a developer and technical lead, I’ve architected, developed, and deployed products putting AI to a wide range of uses in the media sphere. Here are a few of the projects I’ve been working on lately.</span></div>
          </div>
          <div id="workPageCardLayout">
            <div className="workPageCard">
              <a className="cardImageWrapper" href="ai-authoring-engine-page.html">
                <img className="cardImage" src="./engineCoverImage.jpg" alt="AI Authoring Engine"/>
              </a>
              <div>
                <div id="cardDescription">
                  <div className='cardTitle'>AI Authoring Engine</div>
                  <div className="cardText">DOW JONES & CO. [2022-2025]</div>
                  <div className="cardText">Tool for building LLM- and rules-engine AI-based stories</div>
                </div>
              </div>
            </div>
            <div className="workPageCard">
              <a className="cardImageWrapper" href="/automated-publishing">
                <img className="cardImage" src="./aiPublishingCoverImage.jpg" alt="AI Story Autopublisher"/>
              </a>
              <div>
                <div id="cardDescription">
                  <div className='cardTitle'>AI Story Autopublisher</div>
                  <div className="cardText">DOW JONES & CO. [2020-2025]</div>
                  <div className="cardText">Automated publishing system for AI-authored stories</div>
                </div>
              </div>
            </div>
            <div className="cardRowBreak" />
            <div className="workPageCard">
              <a className="cardImageWrapper" href="/marketwatch-on-alexa">
                <img className="cardImage" src="./alexaCoverImage.jpg" alt="MarketWatch on Alexa"/>
              </a>
              <div>
                <div id="cardDescription">
                  <div className='cardTitle'>MarketWatch on Alexa</div>
                  <div className="cardText">DOW JONES & CO. [2021-2023]</div>
                  <div className="cardText">Skill delivering market news, driven by rules-engine AI</div>
                </div>
              </div>
            </div>
            <div className="workPageCard">
              <a className="cardImageWrapper" href="/watchlist-recaps">
                <img className="cardImage" src="./watchlistRecapCoverImage.jpg" alt="Watchlist Recaps"/>
              </a>
              <div>
                <div id="cardDescription">
                  <div className='cardTitle'>Watchlist Recaps</div>
                  <div className="cardText">DOW JONES & CO. [2022-2024]</div>
                  <div className="cardText">Feature recapping company watchlists with AI narratives</div>
                </div>
              </div>
            </div>
            <div className="workPageCard">
              <a className="cardImageWrapper" href="/script-assist">
                <img className="cardImage" src="./scriptAssistCoverImage.jpg" alt="Gen AI ScriptAssist"/>
              </a>
              <div>
                <div id="cardDescription">
                  <div className='cardTitle'>Gen AI ScriptAssist</div>
                  <div className="cardText">XANDRA, INC. [2020]</div>
                  <div className="cardText">Scriptwriting assistant for Conversation Designers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT PAGE */}
      <div id="contactPage">
        <div id="contactPageContainer">
          <div id="contactPageTitleDiv">
            <div id="contactPageTitle" className="titleText"><span>Contact</span></div>
          </div>
          <form action="https://formspree.io/f/mdkeogpv" method="POST">
            <div class="contactPageForm">
              <div class="contactPageHalfField">
                <input type="text" name="name" id="contactPageNameField" class="contactPageFormControl" placeholder="Name"></input>
              </div>
              <div class="contactPageHalfField">
                <input type="email" name="email" id="contactPageEmailField" class="contactPageFormControl" placeholder="Email"></input>
              </div>
              <div class="contactPageFullField">
                <textarea name="message" id="message" rows="5" class="contactPageFormControl" placeholder="Message"></textarea>
              </div>
              <button class="contactPageSubmitButton" type="submit" label="Send Message">Send Message</button>
            </div>
          </form>
          <div id="contactPageFooter">
            <svg class="contactPageSvgArc" viewBox="0 0 1440 114" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 114C0 114 218.416 0 693.5 0C1168.58 0 1440 114 1440 114H0Z"></path>
            </svg>
            <div id="contactPageFooterButtonDiv">
              <a id="contactPageGithubLink" href="https://github.com/sarah-schmoller"><img src="./githubIcon.png"/></a>
              <a id="contactPageLinkedInLink" href="https://www.linkedin.com/in/sarah-schmoller"><img src="./linkedInIcon.png"/></a>
              <a id="contactPageMailLink" href="mailto:sarah.schmoller@gmail.com"><img src="./mailIcon.png"/></a>
            </div>
            <div id="contactPageCopyright"><span>©2023 Sarah Schmoller. All rights reserved.</span></div>
          </div>
        </div>
      </div>
      <div id="pageFooter"></div>
    </div>
  );
}

export default HomePage;
