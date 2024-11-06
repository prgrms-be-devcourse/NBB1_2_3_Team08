package edu.example.learner_kotlin.member.exception

import org.springframework.http.HttpStatus

enum class FollowException(private val message: String, private val status: HttpStatus) {
    FOLLOW_FAILED("팔로우에 실패하였습니다.", HttpStatus.BAD_REQUEST),
    FOLLOWER_NOT_FOUND("팔로워를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST),
    FOLLOWING_NOT_FOUND("팔로잉를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);


    val memberTaskException: MemberTaskException
        get() = MemberTaskException(this.message, status.value())
}