const Group = require('../models/group');
const UserGroup=require('../models/usergroup');

const User=require('../models/signup');

exports.createGroup = async (req, res, next) => {
  try {
    const { groupName, members } = req.body;
    const userId = req.user.id;
     const grp=await Group.findAll({where:{nam:groupName}});
    if(grp.length>0){
     for (const member of members) {
          const user = await User.findOne({ where: { nam: member } });
          if (user) {
            const memberUser = {
              signupId: user.id,
              groupName: groupName,
              nam: user.nam,
              groupId: grp[0].id
            };
            await UserGroup.create(memberUser);
          }
        }
            res.status(201).json({ success: true, groupid:grp[0].id, message: 'Added member in  Existing Group successfully' });
      } 

    else{
    // Create a new group in the database
    const group = await Group.create({ nam: groupName });
    //const gro=await Group.findAll({where:{name:groupName}});

// Add the user who created the group to the group's member list
const groupUser = {
  signupId: userId,
  groupName: groupName,
  nam: req.user.nam,
  groupId: group.id
};
await UserGroup.create(groupUser);


// Add any additional members to the group's member list
for (const member of members) {
  const user = await User.findOne({ where: { nam: member } });
  if (user) {
    const memberUser = {
      signupId: user.id,
      groupName: groupName,
      nam: user.nam,
      groupId: group.id
    };
    await UserGroup.create(memberUser);
  }
}
    res.status(201).json({ success: true, groupid:group.id, message: 'Group created successfully' });
}
  }
   catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

exports.getgroupname= async (req,res,next)=>{
  try{
    const groupDetails=await UserGroup.findAll({where:{signupId:req.user.id}});
    res.status(201).json({ success: true, groupDetails:groupDetails });

  }
  catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
}