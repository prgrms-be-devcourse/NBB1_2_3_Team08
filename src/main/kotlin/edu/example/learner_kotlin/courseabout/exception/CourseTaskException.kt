package edu.example.learner_kotlin.courseabout.exception




class CourseTaskException(message: String?, val statusCode: Int) : RuntimeException(message)