


const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjM5MzI1MDU0NDkyMjEzMjU4.Xbpn3g.N6KB3yWrjLVP7TP_i_jI8yhuWj4";

client.login(token)
 var cookie = "B4C98FF5F90CE742434C025A44CF3F58F0C2B4B3FC529B2CD063C2FDE427215B08B0491901CC015D0F00C41872091BC711E1C756BAE2642ED1AE8AC71B6417B958BEF9FC6812A8A5CA664E9C1A28792893B5A36924583D0F23317FEA5B18B51C36139FFA028B8FA9F24D3F0983CE907BFEC633A0FE3D7F3552338BC2E01E426B069FF953D17E2D589C2AB60D200CCD94CD9B564FC618BEB1E332490233924C7C46A0E751FA77979EB89D2186FB6574ED06A5FCA0FA96F03DAE2D82448DE0062267885D38ED0BFB71657AD57AD776AEBCCD4F939F5E0390A51BB443B0F552FC45035628018D72BA6715F069CF6A5F4C4033ADA6B4F090AA8FEC60328221F92E0801267B2408160EA27AC42FFA446D7E93588EB73509FF63A6F0E50915BF34E8291C732895";

var prefix = 'sh!';
var groupId = 4520986;
var maximumRank = 17;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Chairperson"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})