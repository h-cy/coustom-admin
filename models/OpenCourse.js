module.exports=(sequelize,Type)=>{
    const OpenCourse = sequelize.define('OpenCourse',{
        name:Types.STRING(50),
        description:Types.STRING(100),
        time:Types.DATE,
        poster:Type.STRING(100),
        count:Types.INIEGER
    })
    OpenCourse.sync();
    return OpenCourse;
}