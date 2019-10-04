var conn = require('./db');
module.exports = {

    dashboard(){

        return new Promise((resolve, reject) => {


                conn.query(`SELECT
                (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                (SELECT COUNT(*) FROM tb_exames) AS nrexames,
                (SELECT COUNT(*) FROM tb_doctor) AS nrdoctor,
                (SELECT COUNT(*) FROM tb_users) AS nrusers;`,                 

        (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
        });


    },
    getParms(req, params){

        return Object.assign({}, {

            menus: req.menus,
            user: req.session.user
        }, params);

    },
    getMenus(req){

        let menus = [
            {
                text: "Tela Inicial",
                href: "/admin/",
                icon: "home",
                active: false
            },
            {
                text: "Marketing",
                href: "/admin/menus",
                icon: "cutlery",
                active: false
            },
            {
                text: "Agendamento",
                href: "/admin/reservations",
                icon: "calendar-check-o",
                active: false
            },
            {
                text: "Exames",
                href: "/admin/exames",
                icon: "calendar-check-o",
                active: false
            },
            {
                text: "Medicos",
                href: "/admin/doctor",
                icon: "envelope",
                active: false
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "comments",
                active: false
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "users",
                active: false
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "envelope",
                active: false
            },
            {
                text: "Financeiro",
                href: "/admin/financeiro",
                icon: "envelope",
                active: false
            }
        ];

        menus.map(menu => {

            if (menu.href === `/admin${req.url}`) menu.active = true;

        });

        return menus;

    }

};