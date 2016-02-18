module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	//Configuración del proyecto
	grunt.initConfig({
		jshint:{
			all : ["alumnos.js"]
		},
		concat : {
			dist : {
				src : ["alumnos.js", "script.js", "script1.js"],
				dest: "unidos.js"
			}
		},
		uglify : {
			dist : {
				src : "unidos.js",
				dest : "build/unidos.min.js"
			}
		},
		exec : {
			removeDeploy : "rm -R deploy",
			removeFile : "rm unidos.js",				
			createDir : "mkdir deploy",				
			moveFile : "mv build/unidos.min.js deploy/unidos.min.js",
			removeBuild : "rm -R build"
		}	
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-exec');	

	//Tareas por defecto
	grunt.registerTask('default', ['jshint','concat','uglify', 'exec:removeDeploy', 'exec:removeFile', 'exec:createDir','exec:moveFile', 'exec:removeBuild']);
}