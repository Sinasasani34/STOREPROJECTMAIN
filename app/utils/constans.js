module.exports = {
    MongoIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }),
    PERMISSIONS: Object.freeze({
        USER: ["profile"],
        ADMIN: ["all"],
        SUPERADMIN: ["all"],
        CONTENT_MANAGER: ["course", "blog", "category", "product"],
        TEACHER: ["course", "blog"],
        SUPPLIER: ["product"],
        ALL: "all"
    }),
    Access_TOKEN_SECRET_KEY: "D1EFDFB8DB832421B1E8F918FE29EBDCEC7C6492D3E56A8D3429936A60270529",
    Refresh_TOKEN_SECRET_KEY: "C012CB2DF2DF5084C751D80AFAED49EA99A375A4255728450FDF28A7A0776F26"
}

