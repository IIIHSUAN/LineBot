module.exports = function() { 

  value = [1,2,3,4,5,6,7,8,9,10,10,10,10];
  card_color = ['桃','心','方','梅'];
  card_number = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  state = {
    Idle:0,           // S0: game not initialized
    Start:1,          // S1: Shuffle cards, give 2 cards to client and 1 card to server
    Ask:2,            // S2: Ask for Adding one card or not
    Add:3,            // S3: Give client one extra card
    NotAdd: 4,        // S4: Client pass
    ServerRound: 5,   // S5: Server play
    Check: 8,         // S8: Check for result
    Final: 9          // S9: Game end & show result
  }
  current_state = state.Idle;

  server_cards = [];
  client_cards = [];

  rand = function(max) {
    return Math.floor(Math.random() * max);
  }
  addOneCard = function(who) {
    var isSame = false;

    while(1) {
      var color = rand(4);
      var number = rand(13);

      isSame = false;
      server_cards.forEach((i)=>{
        if(i[0]==color&&i[1]==number)
         isSame = true;
      })
      client_cards.forEach((i)=>{
        if(i[0]==color&&i[1]==number)
         isSame = true;
      })
      if(!isSame)
      {
        who.push([color,number]);
        return;
      }
    }    
  }

  stackToString = function(who) {
    var str='';
    who.forEach(i=>{
      str+=card_color[i[0]]+card_number[i[1]]+' ';
    });
    return str;
  }

  dealerPlayRound = function(isAdd) {
    var str = '';
    console.log('    Dealer play round:');

    if(isAdd) {
      str += 'Server determine to add one card\n';
      addOneCard(server_cards);
      console.log('      determine to add one card, Server stack: '+server_cards);
    }
    else {
      str += 'Server determine to pass\n';
      console.log('      Server determine to pass');
    }

    return str;
  }

  getPoint = function(who, isForceLarge = false) {
    var point = 0, hasA = false;
    who.forEach(i=>{
      point+=value[i[1]];

      if(i[1]==0)
        hasA = true;
    });

    if(hasA&&((point+10)<=21||isForceLarge))  // point can be added by 10
      point+=10;

    return point;
  }

  result = function() {
    if(getPoint(client_cards)==21 || getPoint(server_cards)>21)
      return 'Client win !';
    else if(getPoint(server_cards)==21 || getPoint(client_cards)>21)
      return 'Server win !';
    else
     return getPoint(server_cards,true)>=getPoint(client_cards,true)?'Server Win (point equal or larger)':'Client Win (point larger)';
  }

  run = function(input) {
    console.log('Input: '+input);
    console.log('Start Run');

    var str = '';

    while(true) {

      if(current_state==state.Idle) {
        console.log('  state: Idle');
        if(input=='start') {
          current_state = state.Start, str += 'Game Start\n';
          input = '';
          continue;
        }
        
        str += 'Hello!\nType "start" to play game !\n';
        break;
      }
      else if(current_state==state.Start) {
        console.log('  state: Start');
        str += 'Shuffling cards...\n';

        server_cards = [];
        client_cards = [];

        addOneCard(server_cards);
        console.log('    Server stack: '+server_cards);

        addOneCard(client_cards), addOneCard(client_cards);
        console.log('    Client stack: '+client_cards);
        str += 'Your Cards: ' + stackToString(client_cards)+'\n';

        current_state = state.Ask;
        input = '';
        continue;
      }
      else if(current_state==state.Ask) {
        console.log('  state: Ask');
        
        if(input=='y') {
          current_state = state.Add;
          input = '';
          continue;
        }
        else if(input=='n') {
          current_state = state.NotAdd;
          input = '';
          continue;
        }

        str += 'Would you like to add one card ? (Type "y" or "n")\n';
        break;
      }
      else if(current_state==state.Add) {
        console.log('  state: Add');
        str += 'Adding card...\n';
        addOneCard(client_cards);
        console.log('    Client stack: '+client_cards);
        str += 'Your Cards: ' + stackToString(client_cards)+'\n';
        
        current_state = state.ServerRound;
        input = '';
        continue;
      }
      else if(current_state==state.NotAdd) {
        console.log('  state: NotAdd');
        str += 'You Pass this round\n';
        str += 'Your Cards: ' + stackToString(client_cards)+'\n';

        current_state = state.ServerRound;
        input = '';
        continue;
      }
      else if(current_state==state.ServerRound) {
        console.log('  state: ServerRound');

        var isContinue = true;
        
        if(getPoint(server_cards,true)>10 || getPoint(server_cards)==21 || Math.random()>0.8)  // mimic a dealer decision
          isContinue = false;

        str += dealerPlayRound(isContinue);

        if(isContinue) {
          current_state = state.Check;
          input = '';
          continue;
        }
        else {
          current_state = state.Final;
          input = '';
          continue;
        }
        break;        
      }
      else if(current_state==state.Check) {
        console.log('  state: Check');

        if(getPoint(server_cards)>21||getPoint(client_cards)>21 || getPoint(server_cards)==21||getPoint(client_cards)==21) {
          current_state = state.Final;
          input = '';
          continue;
        }
        else {
          str += 'You and Server are still under 21 points, game continue...\n';

          current_state = state.Ask;
          input = '';
          continue;
        }
        break;
      }
      else if(current_state==state.Final) {
        console.log('  state: Final');

        if(input=='re') {
          current_state = state.Start;
          input = '';
          continue;
        }
        else {
          str += '\nReveal Server Cards First...\n';
          str += '\nFinal Result:\nServer Cards: '+stackToString(server_cards)+'\nClient Cards: '+stackToString(client_cards)+'\n\n';
          str += result();
          str += '\n\ntype "re" to restart\n\n';
        }

        break;
      }
      else {
        console.log('  state: Unknown');
        break;
      }
    }
    console.log('End Run\n');
    return str;
  }
}