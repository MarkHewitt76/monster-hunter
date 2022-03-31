# Nathan & Caoimhin's MONSTER HUNTER

Nathan & Caoimhin's MONSTER HUNTER is a simple, text-and-image-based online game, inspired by the imaginations of my little brothers, Nathan McConnell-Hewitt (11) and Caoimhin McConnell-Hewitt (9).

Both boys, Caoimhin in particular, are fascinated by prehistoric, mythological and fantasy creatures and a favourite pastime of theirs is drawing pictures of fantastical beasts of their own invention. Nathan has even gone so far as to combine this with his interest in gaming to create a 'monster log book' with pictures, descriptions and dungeon maps, for use in the creation of various potential role-playing / board games. And it was this book, as well as Caoimhin's numerous books full of invented creatures, that inspired the creation of this website.

The rules of the game are simple. The player takes on the role of a monster hunter with a choice of ten different weapons. A random monster is 'found' for them to hunt, chosen from a selection ranked by three different levels. Level one monsters are vulnerable to three specific weapons in the player's arsenal, level two monsters to two, and level three monsters to only one. The player then has three chances to pick the right weapon or the monster escapes. 

This website site aims to provide a fun, challenging game with increasing levels of difficulty and an element of chance, which tests the user's memory the more they play. Users of this site will also be entertained by the children's drawings of the fantasy, mythological and totally original monsters, which they will be able to view in a gallery, as well as by the humorous animated gifs that greet both successful and unsuccessful outcomes. The user can see drawings of the various weapons when they read the game rules and will have the option of entering their name at the beginning, which will then appear in the messages displayed at the end of every 'attack', providing a more personalised experience.

![Homepage screenshot](/assets/images/screenshots/monster_hunter_home_scr.png "Homepage")

The site can be viewed [here](https://markhewitt76.github.io/monster-hunter/).

## User Experience (UX)
---

### User Stories

- #### Casual/First-time Visitor Goals

    i. As a Casual/First-time Visitor, I want to easily understand the main purpose of the site.

    ii. As a Casual/First-time Visitor, I want to be able to easily and intuitively navigate through the site.

    iii. As a Casual/First-time Visitor, I want to easily find and understand the rules of the game.

    iv. As a Casual/First-time Visitor, I want to easily and intuitively understand the game controls.

- #### Game Player Goals

    i. As a Game Player, I want to be challenged so that I'm encouraged to keep playing.

    ii. As a Game Player, I want to be entertained so that I'll be more likely to come back and play again.

- #### Parent Goals

    i. As a parent I want a game that is somewhat educational, not too scary, but not too childish so that the whole family can enjoy the game together.

- #### Returning/Frequent Visitor Goals

    i. As a Returning/Frequent Visitor, I want to see quickly if there have been any changes so that I can find something new in order to maintain my interest in the game.

    ii. As a Returning/Frequent Visitor, I want to easily bypass what I've already seen so that I can start playing right away.

### Design

- #### Colour Scheme & Imagery

    The main heading/logo and the numbers for the level and attack scores are in bright, bold shades of red and green and stand out against the black background. The mainly white-on-black colour scheme was chosen to complement and enhance the majority of the website's images, which are graphite pencil drawings on 'copy book' paper. The overall effect of these colours and images is intended to be evocative of the website's fun and child-friendly theme. During gameplay, the monster images are enlarged each time an attack fails, in order to add some mild supense as the monster 'gets closer'. Lively and colourful animated gifs are used as 'reward' images at the conclusion of each round of the game to maintain the fun atmosphere and intended humour of the website.

- #### Typography

    The main fonts used throughout the site are 'Kalam' and 'Eater', with 'cursive' as the fallback font in case, for any reason, these fonts aren't being imported into the site correctly. 'Kalam' is the font for the main body of the site, as well as part of the heading/logo and resembles a more cursive version of Comic Sans, chosen to give the site an air of whimsy and fantasy. 'Eater' was chosen for the the main body of the heading/logo and the monster names because it's typical of the type of font seen in much of children's 'horror' media.

### Functionality

The mechanics of the game are realtively simple:

- In order to ensure that game control is intuitive, (and to make it easier to ensure accessibilty), buttons have been used exclusively for all game interaction.

- Sections containing interactive elements appear only when required and are hidden when not. All sections, images and buttons are animated with either a slight fade-in or roll-down style animation, yet disappear instantly, so as to mitigate the sometimes jarring effect lightning-fast loads while adding a touch of suspense. Useful for children and more sensitive adults alike.

- JavaScript has been utilised to toggle the 'display: none;' style attribute on or off as required on each element containing such sections. This ensures that they are removed from the flow of the page entirely, taking up no space, and cannot be accessed until required or accidentally interacted with by the user in any way.

- The display style of these elements has been included as an attribute in the HTML as a failsafe against the CSS stylesheet failing to load for any reason.

- As the game progresses, further intuitive control is facilitated by the use of 'hash' links to guide the user to the next section/button requiring their attention.  

- Following the rules outlined in the introductory section of this README, the main game functions and workflow are outlined below:

    - generateMonsterArray(): builds and returns the main monster array which looks something like the following:

        - [[Level3monsters], [Level2monsters], [level3monsters]  <br>
        (levelXmonsters) [{monsterObject1}, {monsterObject2}, ... x 5]  <br>
        (monsterObjectX) {name: 'monster name', image: 'filepath/monster.jpg', weaknesses: ['weapon1', 'weapon2', etc.], designer: 'Nathan/Caoimhin'}

    - getRandomMonster():

        - Calls generateMonsterArray().

        - Reads the current level from the DOM and iterates through the monster array to find the matching level array, or throws an error if the current level is outside the defined range.

        - Returns a random monster object from the level array using Math.random().

    
    - startGame(): Called by the event listeners on both the 'Find a Monster' (main game start) and 'Next Level' buttons
        
        - Toggles the display of the game page landing section to 'none' 
        
        - Calls hideMutableElements(): gets all elements with the class name 'mutable-elements', iterates throught them and set their display to 'none' if not already in that state.

        - Removes the 'display: none;' style attribute from the main game section, which contains the main game buttons, the scores display, the game message (feedback message) section, the arena section and the win/lose image section.

        - Removes the 'display: none;' style attribute from the arena section, which contains the 'Ready Your Weapons/Choose Your Weapon' button, the list of weapons (hidden) and the active monster image section (hidden).

        - Calls incrementLevel(): increases the current level (initially set to 0 in the DOM on page load) by 1 and writes it to the DOM.

        - Calls displayRandomMonster(): see below.

        - Activates a 'hash' link to the top of the main game section using window.location.href

    - displayRandomMonster():

        - Calls hideMutableElements() and removes the 'display: none;' style attribute from the arena section.

        - Sets the current number of remaining attacks by writing '3' to the 'attacks' span in the DOM.

        - Gets the random monster object from getRandomMonster().

        - Reads the current user's name from the DOM, if any has been entered.

        - Composes an HMTL feedback message containing the monster object's 'name' key and the current user's name and writes it to the game message section of the DOM.

        - Writes an 'img' element to the active monster image section of the DOM, with the filepath from the monster object's 'image' key as its 'src' attribute and with the objects 'designer' key contained in the 'alt' attribute.

        - Removes the 'display: none;' style attribute from the active monster image section.

    - displayWeapons(): called by the 'click' event listener on the 'choose weapon' button if 'Ready Your Weapons' is its text content.

        - Sets the active monster image section's display to 'none'.

        - Removes the 'display: none;' style attribute from the weapons list.

        - Changes the text of the button to 'Choose Your Weapon'.

    - hideWeapons(): called by the 'click' event listener on the 'choose weapon' button if 'Choose Your Weapon' is its text content.

        - Hides the weapons list by setting it's display to 'none'.

        - Changes the text of the button to 'Ready Your Weapons'.

        - Removes the 'display: none;' style attribute from the active monster image.

    - resolveBattle(): called by the 'click' event listener on any of the weapon buttons, which passes it that button's text content as an argument.

        - Activates a 'hash' link to the top of the main game section using window.location.href

        - Calls getActiveMonster(): calls generateMonsterArray(), reads the active monster's name from the DOM, searches for the name in the main monster array and returns the active monster object.

        - Searches the active monster object's 'weaknesses' array for the weapon button's text content.

        - If there's no match, passes the weapon button's text content to, and calls,  <br>
        decrementAttacks(): decreases the current number of remaining attacks (initially set to 3 in the DOM by displayRandomMonster()) by 1 and writes it to the DOM,   <br>
        then calls displayFailureMessage(): see below.

        - If there's a match, passes the weapon button's text content to, and calls, displayWinMessage(): see below 

    - displayFailureMessage(): passed the selected weapon button's text content as an argument by resolveBattle()

        - Reads the current number of attacks from the DOM.

        - If the number is 2, passes the weapon button's text content as an argument to, and calls, failureMessage1(): see below. 

        - If the number is 1, passes the weapon button's text content as an argument to, and calls, failureMessage2(): see below.

        - If the number is 0, passes the weapon button's text content as an argument to, and calls, defeatMessage3(): see below.

        - Throws an error if the number is outside the defined range. 

    - displayWinMessage(): passed the selected weapon button's text content as an argument by resolveBattle()

        - Reads the current level from the DOM.

        - If the level is 1, passes the weapon button's text content as an argument to, and calls, winMessage1(): see below. 

        - If the level is 2, passes the weapon button's text content as an argument to, and calls, winMessage2(): see below.

        - If the level is 3, passes the weapon button's text content as an argument to, and calls, victoryMessage(): see below.

        - Throws an error if the level is outside the defined range.

    - failureMessage1(), failureMessage2, defeatMessage(): passed the selected weapon button's text content as an argument by displayFailureMessage()

        - All three functions perform the same actions, up to a point:

        - Read both the active monster's name and current user's name (if any) from the DOM.

        - Compose an HMTL feedback message containing the active monster's name, the current user's name and the selected weapon button's text content, and writes it to the game message section of the DOM.

        - failureMessage1() and failureMessage2() then increase the height of the active monster image by 50px, whereas:

        - defeatMessage() then:  <br>
        Calls hideMutableElements().  <br>
        Removes the 'display: none;' style attribute from the win/lose image section of the DOM.  <br>
        Writes an 'img' element to that section of the DOM, with the appropriate path to an animated gif as its 'src' attribute and a matching 'alt' attribute.  <br>
        Sets the display of the 'New Monster' button to 'none'.  <br>
        Removes the 'display: none;' style attribute from the 'New Game' button.

    - winMessage1(), winMessage2, victoryMessage(): passed the selected weapon button's text content as an argument by displayWinMessage()

        - All three functions perform the same actions, up to a point:

        - Read both the active monster's name and current user's name (if any) from the DOM.

        - Compose an HMTL feedback message containing the active monster's name, the current user's name and the selected weapon button's text content, and writes it to the game message section of the DOM.

        - Call hideMutableElements().
        
        - Remove the 'display: none;' style attribute from the win/lose image section of the DOM.
        
        - Write an 'img' element to that section of the DOM, with the appropriate path to an animated gif as its 'src' attribute and a matching 'alt' attribute.

        - winMessage1() and winMessage2() then removes the 'display: none;' style attribute from the 'Next Level' button, whereas:
        
        - victoryMessage() then:  <br>
        Sets the display of the 'New Monster' button to 'none'.  <br>
        Removes the 'display: none;' style attribute from the 'New Game' button.

    - newGame(): called by the 'click' event listener on the 'New Game' button.

        - Removes the 'display: none;' style attribute from the 'New Monster' button.

        - Resets the current level by writing '0' to the 'level' span in the DOM.

        - Calls startGame().

- Non-game functions

    - displayAllMonsters(): called by the 'click' event listener on the 'Meet the Monsters' button.

        - Calls generateMonsterArray().

        - Builds an array (of arrays) of HTML elements by iterating through the main monster array, calling generateMonsterGalleryHtml(), (see below), and passing each level of monster objects to it as an argument.

        - Writes the generated arrays of monster object HTML elements to their respective sections in the monster gallery section of the DOM.

        - Calls hideMutableElements().

        - Removes the 'display: none;' style attribute from the monster gallery section.

    - generateMonsterGalleryHtml(): passed an array of monster objects by displayAllMonsters() as an argument.

        - Builds and returns an array of 'figure'>'figcaption'+'image' HTML elements, with each monster object's 'name' key as the content of the 'figcaption' element, and its 'image' and 'designer' keys contained in the 'img' element's 'src' and 'alt' attributes respectively.

    - displayRules():

        - Calls hideMutableElements().

        - Removes the 'display: none;' style attribute from the 'rules' section of the DOM.

    - storeUsername(): called by both the 'click' event listener on the 'Enter' button and the 'keydown' event listener on the input box on the game page landing section. 

        - Gets the value of the 'username' input element on the game landing page.

        - Writes the value to the 'added-name' span in 'name-entry' paragraph the DOM for temporary storage.

        - If the value is not an empty string, changes the 'placeholder' attribute of the input element to 'Name entered. Thanks!'

        - Removes the 'display: none;' style attribute from the 'name entry' paragraph.

- Event Listeners

    - All event listeners are grouped together in three anonymous functions at the top of script.js

    - The first is a 'DOMContentLoaded' event listener that calls an anonymous function containing all the others, thus ensuring that the DOM structure is in place before any functions are called.

    - It first calls hideMutableElements(), then gets all the buttons (by class name rather than tag name, in case any non-event buttons are added in the future) and iterates through them with a 'click' event listener that calls another anonymous function running an 'if-else' statment, identifying each button by id and executing their respective code. For the operation of each button, see the 'Features' section of this README, below.

    -  It then adds a 'keydown' event listener to the input box in the game page landing section that calls yet another anonymous function, which uses both the 'event.key' and 'event.code' statements (for cross-browser compatability) to call storeUsername() when the 'Enter' key is pressed.

### Defensive Design

 - #### Internal Errors

    Due to the simplicity of the game mechanics, the main possibilities of an internal error depend upon:

    - the selected weapon finding a match within the corresponding monster's list of weaknesses in the monster array

    - the current level number being written correctly to the DOM

    - the number of remaining attacks being written correctly to the DOM

    Since extensive testing has ensured that, at the time of publishing, the weapons list matches all the listed weaknesses, that leaves just the level and attacks numbers.

    As the initial level number is set by being written to the DOM at the beginning of each new game, and the initial number of remaining attacks is set by writing to the DOM when a new monster is selected, the checks for potential errors occur when reading them back from the DOM, after they have been incremented or decremented accordingly, at the beginning of each new level and at the end of each attack round respectively. In the unlikely event that either number is outside of its defined range, (0-3), an alert is displayed to the user asking them to refresh the page and the 'throw' statement is used to stop the execution of the game and log an error message to the console, as below:    

```js
else {
        alert(`Error! Undefined level: ${level}. Please refresh the page.`);
        throw `Error! Undefined level: ${level}. Aborting!`;
    }
```
```js
else {
        alert(`Error! Undefined number of attacks: ${attacks}. Please refresh the page.`);
        throw `Error! Undefined number of attacks: ${attacks}. Aborting!`;
    }
```

 - #### User Error

    As the user interface for the game is almost entirely point-and-click/tab-and-enter, the possibility of user error is essentially zero. The sole user input is the option of entering their first name on the game page landing area. As it is optional and affects only what is displayed in the game feedback message, the need for any form of validation is basically redundant. However, to ensure consistency of style, the 'pattern' and 'title' attributes have been used to restrict the input value to upper- and lowercase letters in any language, including accents but without punctuation and to display a tooltip alert if an error is made. 

    For confirmation, the inputted text will appear directly above the 'Find a Monster' button upon being submitted, so that the user can see immediately what will appear as their name within the game. 

```html
<input id="username" type="text" placeholder="First Name (optional)" aria-labelledby="username-prompt" pattern="[\p{L}\p{M}]+" title="Enter your First Name only">
```

## Features
---

### Existing Features

This website is responsive on all device sizes and the majority of features are interactive.

- #### Navigation: Landing Page Buttons

    - On landing, the user is immediately presented with three buttons.

    - As a responsive design feature, the buttons change from inline to a block display on screens less than 640 pixels wide.

    - The larger, white, middle button, labelled 'Let's Hunt!', navigates to the game page.

    - The smaller, black button to the left (or on top at smaller screen widths) toggles between the labels 'Meet the Monsters' and 'Hide the Monsters' when clicked and displays or hides the monster gallery accordingly. It also toggles the label and action of the 'Read the Rules' button when necessary.

    - The smaller, black button to the right (or on the bottom at smaller screen widths) toggles between the labels 'Read the Rules' and 'Hide the Rules' when clicked and displays or hides the game rules and Nathan's weapon drawings accordingly. It also toggles the label and action of the 'Meet the Monsters' button when necessary.  

    - The toggle action of the buttons allows the user to tell at a glance which section is being displayed even when the full page is not visible on screen.

    - Both the monster gallery and rules sections have a 'hash' link at the bottom, styled to resemble the black buttons, which will return the user to the top of the landing page.

    ![Landing page buttons screenshot](/assets/images/screenshots/monster_hunter_landing_btns_scr.png "Landing page buttons")
    !['Hide the Monsters' button with gallery open](/assets/images/screenshots/monster_hunter_htm_btn_scr.png "Hide the Monsters button with gallery open")
    !['Hide the Rules' button with section open](/assets/images/screenshots/monster_hunter_htr_btn_scr.png "Hide the Rules button with section open")

- #### Navigation: Game Page Buttons

    - #### Game Page Landing Section

        - The large, white button, labelled 'Find a Monster', stands out as the means of starting the game. When activated, the landing section is hidden and replaced with the main game section and the browser window drops so that the main game buttons are at the top of the screen.

        - The smaller, black button below, labelled 'Turn Back', navigates back to the homepage.

    - #### Main Game Section

        - The 'Quit' button navigates back to the homepage.

        - The large, white button, labelled 'Ready Your Weapons' sits between the game feedback message and the active monster image. When activated it displays the weapon buttons, hides the monster image, drops the browser window so that the feedback message is at the top of the screen and its label changes to 'Choose Your Weapon'. If activated a second time, it hides the weapon buttons, displays the monster image again and its label changes back to 'Ready Your Weapons'. This function is useful to the user that would like to see the monster image again before attacking, perhaps inferring something from the image about which weapon would be most effective.

        - When a weapon button is selected, the browser window rises back up so that the main game buttons are at the top of the screen.

    ![Game Page Landing: Navigation buttons screenshot](/assets/images/screenshots/monster_hunter_game_landing_btns_scr.png "Game page landing navigation buttons")
    ![Main Game Page: Quit button screenshot](/assets/images/screenshots/monster_hunter_quit_btn_scr.png "Main game page quit button")
    ![Main Game Page: 'Ready Your Weapons' button screenshot](/assets/images/screenshots/monster_hunter_ready_w_btn_scr.png "Main game page Ready Your Weapons button")

- #### Navigation: A Note on Style and Accessibility

    The main reason, aside from consistency of style, for the almost exclusive use of buttons throughtout the site is to facilitate tab-and-enter keyboard navigation and operation, as well as most other assistive technologies. As the 'button' HTML element has built-in focus and activation properties, it can be accessed and activated almost as easily by keyboard, touchscreen, voice command, etc, as it can with a mouse or touchpad, without the need for 'keydown' event listeners or other extraneous code to give focus to interactive elements.

    The button element also has a built-in focus effect which means that although all buttons on the site, for emphasis, have a hover effect with box shadow and a negative Y-axis transform, a similar focus effect was only necessary on the 'Ready Your Weapons/Choose Your Weapons' button, as it would have been distracting otherwise.

    Also, as the entire website is only two pages wide and designed with fluid, intuitive navigation in mind, the use of anchor tags seemed unnecessary as all links on the site are internal. Hence, for consistency, buttons have been used as both page and 'hash' links via the JavaScript 'window.location.href' method, with a 'role = "link"' attribute added for ARIA compliance. Admittedly, this method does away with the ability to, for example, open a link in a new tab with a 'right-click' of the mouse, but it doesn't seem like that will be an issue on a website this small.

    ![Weapon button 'tab focus' effect screenshot](/assets/images/screenshots/monster_hunter_choose_w_btn_focus_scr.png "Weapon button tab focus effect")

- #### Homepage: Landing

    - The landing, as seen in the introductory section of this README, consists of a large, bold, colourful logo, a short description and three buttons.

    - The largest of the three buttons, 'Let's Hunt!', serves as a 'call to action' to begin the game and has a font and colour scheme evocative of children's horror fantasy. 
    
    - This immediately sets the tone for the entire website: FUN! (And maybe a wee bit scary).

- #### Homepage: Monster Gallery

    - The Monster Gallery, when visible, allows the user to view all the weird names and wonderful drawings of the monsters created by Nathan and Caoimhin for the game. They are arranged by level and alphabetically by name.

    ![Monster Gallery screenshot](/assets/images/screenshots/monster_hunter_mtm_scr.png "Monster gallery")

- #### Homepage: Game Rules

    - The Rules section, when visible, lets the user read the rules of the game in an orderly list, including a list of the available weapons accompanied by Nathan's designs.

    ![Rules Section screenshot](/assets/images/screenshots/monster_hunter_rtr_scr.png "Rules section")

- #### Footer

    - The footer section, featured on both pages of the website, contains the design credit information and includes a copyright statement.

    ![Footer screenshot](/assets/images/screenshots/monster_hunter_foot_scr.png "Footer")

- #### Game Page: Landing

    - Upon landing on the game page, the user is presented with a smaller, more inline version of the main heading/logo, followed by a simple message that states, 'Welcome to the Hunt!'. There is also a text input box, inviting the user to enter their first name, if they so choose, and the buttons to either begin the game or return to the homepage.

    - To ensure consistency of style during gameplay, the input box will display a validatioon-style tooltip if a format other than a first name in any language is entered, such as one containing numbers, spaces, symbols, etc. This is useful to all users as it keeps the input short while allowing for accents, etc.

    - This page is useful to both those who wish to have a more personalised experience in the game and those who merely wish to start playing immediately.

    ![Game Page Landing screenshot](/assets/images/screenshots/monster_hunter_game_landing_scr.png "Game page landing")

- #### Main Game Section

    - Having selected the 'Find a Monster' button on the landing page, the user is presented immediately with the first round of gameplay.

    - To aid the flow of gameplay, the two initial game buttons are now at the top of the screen, though the user can still scroll up to see the logo.

    - The 'Quit' button is on the right. The button on the left, lablelled 'New Monster', allows the user to 'roll' a new random monster at any time, on any level, resetting the number of available attacks to 3. This is especially useful for those new to the game or still learning, giving the user the opportunity to try again without dropping a level.

    - Directly beneath these buttons is the 'scores' section, with the current level displayed on the left and remaining attacks on the right. The numbers are coloured green and red respectively, maintaining the colour scheme established with the main header/logo.

    - The game feedback message is underneath the 'scores' section. At the beginning of every new game and every new level, it tells the user the current monster's name and refers to the user by their first name if it was entered. A different message of encouragement is displayed after each attack round, including the name of the weapon selected, the current monster's name and the user's name, if entered. If the user chose not to enter a name, the message reads '...you...' instead. This message is useful for keeping the user entertained and enthusiastic enough to keep playing.

    - The 'Ready Your Weapons' button operates as described above, displaying or hiding the weapons buttons.

    - The ten weapon buttons appear to roll down from top to bottom like a drop down menu. Each button consists of the weapon name and a thumbnail-sized image of the weapon, drawn by Nathan. When one is selected, the weapon buttons disappear and the result of the attack is reported by the feedback message.

    - The image of the current monster appears at the bottom of the main game section.

    - After the first two unsuccessful attacks, the image gets larger to give the impression of the monster getting closer, adding a little suspense, and the feedback message displays a warning, including the monster's name, weapon name and whatever is read as the user's name.  <br>
    After a third unsuccessful attack, the 'Ready Your Weapon/Choose Your Weapon' button and monster image are replaced by a humorous, animated gif and a commiseration message is displayed in the feedback section.  <br>
    The 'New Monster' button is then replaced with the 'New Game' button, giving the user the option of starting over from level 1.

    - After each successful attack, the 'Ready Your Weapon/Choose Your Weapon' button and monster image are replaced by a humorous, animated gif and a congratulatory message is displayed in the feedback section.  <br>
    After the first two successful attacks, the larger, white, 'Next Level' button is displayed between the 'New Monster' and 'Quit' buttons.  <br>
    When selected, it displays the image of the next randomly selected monster from the relevant level, along with its name and the user's name in the feedback message and the 'Ready Your Weapons' button reappears.  <br>
    After a third successful attack, another gif and a cogratulatory message is displayed. The 'New Monster' button is then replaced with the 'New Game' button

    - This quick and responsive style of gameplay helps to maintain the user's interest in the game and encourages repeated plays.

    - As a responsive design feature, the main game buttons change from inline to a block display on screens less than 640 pixels wide, with the 'New Monster' button on top and the 'Quit' button on the bottom.

    ![Main Game Section: Gameplay screenshot](/assets/images/screenshots/monster_hunter_game_main_scr.png "Main game section - gameplay")
    ![Main Game Section: Weapons List screenshot](/assets/images/screenshots/monster_hunter_weapons_scr.png "Main game section - weapons")
    ![Main Game Section: Win Message screenshot](/assets/images/screenshots/monster_hunter_win_scr.png "Main game section - win message")
    ![Main Game Section: Defeat Message screenshot](/assets/images/screenshots/monster_hunter_lose_scr.png "Main game section - defeat message")

### Features for Future Implementation

- More monsters and more levels.

- A 'Weapons Check' (popup?) box, asking the user to confirm their choice of weapon before attacking.

- A high scores page with player stats and achievements.

## Technologies Used
---

### Languages Used

- [HTML5](https://en.wikipedia.org/wiki/HTML5)

- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)

- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

### Libraries & Programs Used

1. [Google Fonts](https://fonts.google.com/)

    Google fonts were used to import the 'Kalam' and 'Eater' fonts into the style.css file which is used on all pages throughout the project.

2. [Git](https://git-scm.com/)

    Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.

3. [GitHub](https://github.com/)

    GitHub is used to store the projects code after being pushed from Git.

4. [Paint Shop Pro](https://en.wikipedia.org/wiki/PaintShop_Pro)

    [Corel Paint Shop Pro Photo XI](http://www.corel.com/akdlm/6763/downloads/Documentation/UserGuides/EN/CorelPaintShopProPhoto.pdf) was used for creating and resizing jpeg images for the site.

## Testing
---

### Validator Testing

- #### HTML

    The official [W3C Markup Validation Service](https://validator.w3.org/) was used to validate both pages of the website and no errors or warnings were returned.

    #### Results:

    - [Home Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fmarkhewitt76.github.io%2Fmonster-hunter%2Findex.html)

    - [Game Page](https://validator.w3.org/nu/?doc=https%3A%2F%2Fmarkhewitt76.github.io%2Fmonster-hunter%2Fgame.html)

- #### CSS

    The official [W3C CSS (Jigsaw) Validation Service](https://jigsaw.w3.org/css-validator/) was used to validate [style.css](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fmarkhewitt76.github.io%2Fmonster-hunter%2Fassets%2Fcss%2Fstyle.css&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) and no errors were returned.

- #### JavaScript

    The JavaScript code was run through the [JSHint](https://jshint.com/) linter with no significant issues.

- #### Accessiblity

    The website was extensively tested for keyboard navigation and was tested for screen readers using the Google Chrome Screen Reader extension.

    Every page was run through Lighthouse in devtools in order to confirm that the website is accsessible and easy to read.

    ![Lighthouse: Home Page screenshot](/assets/images/screenshots/lighthouse_monster_hunter_homepage.png "Lighthouse - Home Page")
    ![Lighthouse: Game Page screenshot](/assets/images/screenshots/lighthouse_monster_hunter_gamepage.png "Lighthouse - Game Page")
    
### Testing User Stories from User Experience (UX) Section

- #### Casual/First-time Visitor Goals

    #### i. As a Casual/First-time Visitor, I want to easily understand the main purpose of the site.

    - Immediately upon entering the site, the user is greeted with a concise introduction, comprehensively describing the purpose of the website.

    - The purpose of the site is also made clear by the distinctive heading/logo.

    - The labels on the buttons are clear and explanatory. 

    #### ii. As a Casual/First-time Visitor, I want to be able to easily and intuitively navigate through the site.

    - The site has been designed to be fluid and never to entrap the user. Each page and section contains clearly and descriptively labelled interactive elements, each outlining their purpose in few words.

    - Internal 'hash' links have been utilised on both pages to minimise the need for scrolling and direct the user through the flow of the site.

    #### iii. As a Casual/First-time Visitor, I want to easily find and understand the rules of the game.

    - Immediately upon entering the site, the 'Read the Rules' button is clearly evident. It also has a distinctive hover effect which is maintained while the rules are being displayed.

    - The rules are stated clearly and succinctly in a well-spaced list, along with a list of the available weapons and their images.

    #### iv. As a Casual/First-time Visitor, I want to easily and intuitively understand the game controls.

    - The 'Let's Hunt' and 'Find a Monster' buttons stand out upon landing on the homepage and game page respectively, each serving as a 'call-to-action' to begin gameplay.

    - All game controls are clearly labelled button elements, accessible via mouse/touchpad, keyboard, touchscreen and other assistive technologies.

    - Each major action during gameplay moves the browser window so that the relevant controls for the next action are at the top of the screen.

    - The in-game message provides feedback between each round of gameplay, prompting the user to move on to the next round and repeatedly stating what weapons were effective/ineffective against a particular monster, aiding the user's memory in the process. 

- #### Game Player Goals

    #### i. As a Game Player, I want to be challenged so that I'm encouraged to keep playing.

    - The first-time player begins with no knowledge of what weapons are effective against which monster and must rely on luck and memory to adavance.

    - There is a major element of chance in that each monster is randomly selected every time.

    - Each level provides a greater degree of difficulty as the monsters' weaknesses to the available weapons become fewer.

    #### ii. As a Game Player, I want to be entertained so that I'll be more likely to come back and play again.

    - The gameplay is simple, fast and intuitive, allowing for repeated plays in a short space of time with instant feedback and reward.

    - The animated gifs that round off each game/level are enjoyable and humorous, as are Nathan and Caoimhin's drawings of each monster.

    - If the user chooses to enter their name before playing, it will provide a more personalised experience which can greatly add to the enjoyment of the game.

- #### Parent Goals

    #### i. As a parent I want a game that is somewhat educational, not too scary, but not too childish so that the whole family can enjoy the game together.

    - The challenge posed to the memory when trying to recall how each weapon affected each monster can aid in the cognitive development of both younger and older users.

    - As the monsters are designed and drawn by children, the game is no scarier than any children's horror fantasy. There is, however, still some element of suspense involved in the gameplay which will appeal to all.

    - The game has ample entertainment value for all ages, even if it's as simple as an enjoyment of children's artistry and imagination or a childlike enthusiasm for simple illustration and instant gratification.  

- #### Returning/Frequent Visitor Goals

    #### i. As a Returning/Frequent Visitor, I want to see quickly if there have been any changes so that I can find something new in order to maintain my interest in the game.

    - The brief introduction on the homepage promises new additions to the game, prompting the user to regularly check the monster gallery.

    - Any updates to gameplay will also be listed in this section and in the game rules.  

    #### ii. As a Returning/Frequent Visitor, I want to easily bypass what I've already seen so that I can start playing right away.

    - The main game page can be accessed by selecting just two buttons in quick succession.

    - Entering the user's name is optional, can be easily bypassed and will not adversely affect the feedback messages.

### Further Testing

- The website was tested in various browsers (Google Chrome; Mozilla Firefox; Microsoft Edge; Safari) for consistency of style, operation and functionality, and also for keyboard navigability.

- The website was tested for responsive design, appearance and functionality on all standard screen sizes using the Chrome devtools device toolbar. It was also tested on various physical devices such as: low and high resolution desktop and laptop displays; various Android tablets and iPads; Samsung Galaxy S6, S8, S9 and A52 5G; iPhone 8, 11 and 12 Mini.

- A large amount of testing was done to ensure that pages were linking correctly and that all buttons worked correctly, as per javaScript coded responses.

- Family members were asked to review the site and documentation to point out any bugs and/or user experience issues. One family member with impaired vision was asked to confirm that all content is readable and understandable. Younger siblings, nieces and nephews were asked to test the site for intuitive navigation, game control and playability.

### Bugs (fixed)

1. #### Level not resetting after 'Quit'

    The very first bug I encountered was with the level increasing beyond '3' and throwing the programmed error message. This took a while to notice as I had been refreshing the page each time I wanted to see changes and therefore not repeating the startGame function. It was a simple fix, once encountered, to add a single line to the top of the quit function resetting the level to '0':

    ```js
    document.getElementById("level").textContent = "0";
    ```

2. #### Link buttons calling game functions

    This bug appeared when I first split the site into two pages and assigned anchor tags to buttons to navigate between them. Later, on running the HTML through the W3C validator, I learned that this was bad practice and removed the anchors in favour of the 'window.location.href = ...' method of navigation via javaScript. Initially, though, I realised it was happening because I was using the 'click' event listener on the generic 'btn' class and solved the problem by splitting the buttons into two different classes, using the event listener on the appropriate one.

3. #### Attacks constantly failing in Safari

    During testing, I found that the game wasn't returning any successful attack outcomes when running in Safari. This is always the first alternative to Chrome that I test in as it causes the most problems. I discovered that this was because I has used 'innerText', rather than 'textContent', to read the selected weapon name from the DOM, which is apprently not supported by Webkit. (Nor Mozilla, as it turns out, so it would have caused the same issue in Firefox). The solution was merely to use 'textContent', directed to the DOM location wher it would get ONLY the text string. i.e.
    ```js
    let weapon = this.children[0].textContent;
    ```

4. #### 

    Upon adding a 'keydown' event listener to the 'Enter Your First Name' input box for the 'Enter' key, the console was showing a 'Cannot read property 'addEventListener' of null...' error when navigating back to the homepage because the button's not on that page. The solution was as follows:
    ```js
    username && username.addEventListener("keydown", function(event) {...
    ```
    as opposed to
    ```js
    username.addEventListener("keydown", function(event) {...
    ```
    I found this answer on StackOverflow (acknowledgement and link in the 'credits' section below). 

#### Unfixed Bugs

    At 08:30 on March 31st 2022, I noticed that the pattern attribute, used for validation of the text input box on the game page landing section wasn't working and have been unable to find a fix at the time of writing.

## Deployment
---

### GitHub Pages

The website was deployed to GitHub pages. The steps to deploy are as follows:

1. In the GitHub repository, navigate to the Settings tab.

2. From the source section drop-down menu, select the Master Branch.

3. Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://markhewitt76.github.io/monster-hunter/).

### Forking the GitHub Repository

By forking the GitHub Repository you can make a copy of the original repository on your GitHub account to view and/or make changes, without affecting the original repository, by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/MarkHewitt76/monster-hunter).

2. At the top of the Repository, just above the "Settings" Button on the menu, click the "Fork" Button. 

3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/MarkHewitt76/monster-hunter)

2. Under the repository name, click "Clone or download".

3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.

4. Open Git Bash.

5. Change the current working directory to the location where you want the cloned directory to be made.

6. Type `git clone`, and then paste the URL you copied in Step 3.

    e.g: `$ git clone https://github.com/MarkHewitt76/monster-hunter.git`

7. Press Enter. Your local clone will be created.

Click [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop) for a more detailed explanation of the process.

## Credits
---

### Code & Content

- The idea and basic code for grouping all event listeners in three anonymous functions at the top of the js file came from the Code Institute [Love Maths](https://markhewitt76.github.io/love-maths/) walkthrough project, as did the idea of incrementing/decrementing scores with, e.g, '++level' and '--attacks' rather than 'level++', etc, in order to ensure changes to these numbers happened before any other operation.

- The solution to the error thrown by the 'keydown' event listener on the 'Enter Your First Name' input was posted to the [StackOverflow](https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null) website as an answer by 'Manel' on April 17th, 2021.

- The basic CSS code for the hover effect on the buttons came from Colt Steele's Udemy course, 'The Web Developer Bootcamp'.

- The fonts used are from [Google Fonts](https://fonts.google.com/).

### Media

- All jpeg images are of drawings by, and are the property of, Nathan McConnell-Hewitt and Caoimhin McConnell-Hewitt.

- The animated gifs displayed for successful attacks, victory and defeat were sourced from [GIPHY](https://giphy.com/) and [tenor](https://tenor.com/) and are free for public use.

### Acknowledegements

- My little brothers, Nathan and Caoimhin, for their inspiration and helpful, enthusiatic feedback.

- My Mentor, Gerard McBride, for continuous helpful feedback.

- My family for their help with testing.
