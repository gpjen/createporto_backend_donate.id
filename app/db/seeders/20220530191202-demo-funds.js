"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "funds",
      [
        {
          tittle: "pembangunan masjid desa hitu messing",
          goal: 100000000,
          desc: "bantuan anda dapat mambantu dan mewujutkan harapan warga desa hitu messing agar dapat memiliki masjid yang layak dan nyaman",
          idUser: 1,
        },
        {
          tittle: "panti asuhan peduli kasih",
          goal: 250000000,
          desc: "membutuhkan uluran tangan anda untuk anak-anak yatim dan piatu agar dapat bersekolah dan memmenuhi kebutuhan sehari-hari",
          idUser: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("funds", null, {});
  },
};
