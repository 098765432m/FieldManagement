const { FieldManager, FieldAccounts } = require("../model/model");

const { setCookie } = require("cookies-next");
const FieldManagerController = {

    //Them tai khoan Quan ly
    addFieldManager: async (req,res) => {
        try{
            const validationError = new FieldManager().validateSync();
            if(!validationError)
                return res.status(400).json({error: validationError.message});

            const newManager = new FieldManager(req.body);

            console.log(newManager.role);
            const savedManager = await newManager.save();
            
            if(savedManager.role === 'owner'){
                const id = savedManager._id;
                await new FieldAccounts({owner: id}).save();
            }

            return res.status(200).json(savedManager);
        }catch(err){
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Get All Manager
    getAllManagers: async (req,res) => {
        try {
            const managers = await FieldManager.find();
            return res.status(200).json(managers);
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err: err.message});
        }
    },

    

    //Get An Manager By ID
    getAnManager: async (req,res) => {
        try {
            
            const id = req.params.id;
            const manager = await FieldManager.findById(id);

            //check tim duoc manager voi id nay ko
            if(!manager)
                return res.status(400).json({error: `Khong tim thay Manager voi ${id}`});


            return res.status(200).json(manager);

        } catch (error) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err: err.message});
        }
    },

    deleteAStaff: async (req,res) => {
        try {
            const id = req.params.id;
            const staff = await FieldManager.findById(id);

            if(!staff)
                return res.status(400).json({error: `Khong tim thay Staff voi ${id}`});

            if(staff.role !== 'staff')
                return res.status(400).json({error: `Khong phai staff khong xoa duoc`});

            staff.deleteOne();
            return res.status(200).json("Deleted a Staff");
        } catch (err) {
            return res.status(statusCode).json({err : err.message});
        }
    },

    //On ly delete an owner
    deleteAnOwner: async (req,res) => {
        try {
            const id = req.params.id;
            const owner = await FieldManager.findById(id);

            if(!owner)
                return res.status(400).json({error: `Khong tim thay Owner voi ${id}`});

            if(owner.role !== 'owner')
                return res.status(400).json({error: `Khong phai owner khong xoa duoc`});

            owner.deleteOne();
            return res.status(200).json("Deleted an Owner");
        } catch (err) {
            return res.status(statusCode).json({err : err.message});
        }
    },

    //Check Auth by username and password
    checkAuth: async (req, res) => {
        try {
            const {username, password} = req.body;
            
            //Check if req have username and password
            if(!(username && password))
                return res.status(400).json({err: `Username or password are empty`})
        
        const acc = await FieldManager.findOne({
            username: username,
            password: password,
        });

        // Check if FieldManager exist
        if(!acc){
            return res.status(400).json({err: `Account has not found`});
        }

        const userString = JSON.stringify(acc);
            // set cookie co ten la 'userData' voi tui tho la 60 * 6 * 24 giay
            setCookie('userData', userString, { req, res, maxAge: 60 * 6 * 24 });
        
        res.status(200).json(acc);
        
        } catch (err) {
            const statusCode = err.statusCode || 500;
            return res.status(statusCode).json({err : err.message});
        }
    }
}

module.exports = FieldManagerController;