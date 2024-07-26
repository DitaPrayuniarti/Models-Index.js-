const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
// Pengguna model
const Pengguna = sequelize.define(
  "Pengguna",
  {
    id_pengguna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_pengguna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kata_sandi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peran_pengguna: {
      type: DataTypes.ENUM("user", "petugas_keuangan"),
      allowNull: false,
    },
  },
  {
    tableName: "pengguna",
    timestamps: false,
  }
);

// PiutangPelanggan model
const PiutangPelanggan = sequelize.define(
  "PiutangPelanggan",
  {
    id_piutang_pelanggan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_pelanggan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_faktur: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_jatuh_tempo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_piutang: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status_pembayaran: {
      type: DataTypes.ENUM("belum_bayar", "sudah_bayar", "tertunda"),
      allowNull: false,
    },
    id_pengguna: {
      type: DataTypes.INTEGER,
      references: {
        model: Pengguna,
        key: "id_pengguna",
      },
    },
  },
  {
    tableName: "piutang_pelanggan",
    timestamps: false,
  }
);

// PembayaranPiutang model
const PembayaranPiutang = sequelize.define(
  "PembayaranPiutang",
  {
    id_pembayaran_piutang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_piutang_pelanggan: {
      type: DataTypes.INTEGER,
      references: {
        model: PiutangPelanggan,
        key: "id_piutang_pelanggan",
      },
    },
    tanggal_pembayaran: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jumlah_pembayaran: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    metode_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pembayaran_piutang",
    timestamps: false,
  }
);

// Proyek model
const Proyek = sequelize.define(
  "Proyek",
  {
    id_proyek: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_proyek: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_selesai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    anggaran_proyek: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    id_pengguna: {
      type: DataTypes.INTEGER,
      references: {
        model: Pengguna,
        key: "id_pengguna",
      },
    },
  },
  {
    tableName: "proyek",
    timestamps: false,
  }
);

// BiayaProyek model
const BiayaProyek = sequelize.define(
  "BiayaProyek",
  {
    id_biaya_proyek: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_proyek: {
      type: DataTypes.INTEGER,
      references: {
        model: Proyek,
        key: "id_proyek",
      },
    },
    jenis_biaya: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_biaya: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tanggal_pembayaran: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "biaya_proyek",
    timestamps: false,
  }
);

// Sync models with the database
// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = {
  Pengguna,
  PiutangPelanggan,
  PembayaranPiutang,
  Proyek,
  BiayaProyek,
};
