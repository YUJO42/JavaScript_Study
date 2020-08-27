/* 다음 소스코드에서 클래스를 작성하여 게임 캐릭터의 능력치와 '파이어볼'이 출력되게 만드세요.
   
    * 여기에 class를 작성하세요 *

    const x = new Wizard(545, 210, 10);
    
    console.log(x.health, x.mana, x.armor);
    > 545 210 10

    x.attack();
    > FireBall
    
*/

const Wizard = class Wizard {
  constructor(health, mana, armor) {
    this.health = health;
    this.mana = mana;
    this.armor = armor;
  }
  attack = () => {
    console.log('FireBall🔥');
  };
};

const x = new Wizard(545, 210, 10);

// check answer

console.log(x.health, x.mana, x.armor);
x.attack();
