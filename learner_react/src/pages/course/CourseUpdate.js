import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Course_Url = "http://localhost:8080/course";

const CourseUpdate = () => {
    const { courseId } = useParams();
    const [courseName, setCourseName] = useState("");
    const [courseLevel, setCourseLevel] = useState("1"); // 초기값을 1로 설정
    const [coursePrice, setCoursePrice] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [memberNickname, setMemberNickname] = useState(""); // 수정이 필요 없는 데이터
    const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태 추가
    const [courseAttribute, setCourseAttribute] = useState("JAVA");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axiosInstance.get(`course/${courseId}`, { withCredentials: true });
                const { courseName, courseLevel, coursePrice, courseDescription, memberNickname } = response.data;
                setCourseName(courseName);
                setCourseLevel(courseLevel);
                setCoursePrice(coursePrice);
                setCourseDescription(courseDescription);
                setMemberNickname(memberNickname); // 수정이 필요 없는 데이터 저장
            } catch (err) {
                setError("강좌를 불러오는 데 실패했습니다.");
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`course/${courseId}`, {
                courseName,
                courseLevel,
                coursePrice,
                courseDescription,
                courseAttribute,
                memberNickname // 수정이 필요 없는 데이터도 함께 전송
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }

            });

            setSuccessMessage("수정에 성공하였습니다."); // 성공 메시지 설정
            setTimeout(() => {
                navigate("/courses"); // 리디렉션
            }, 2000); // 2초 후에 리디렉션
        } catch (err) {
            setError("강좌 수정에 실패했습니다.");
        }
    };

    return (
        <Container>
            <h2>강좌 수정</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* 성공 메시지 표시 */}
            <form onSubmit={handleSubmit}>
                <Label>
                    강좌 이름:
                    <Input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                </Label>
                <Label>
                    강좌 레벨:
                    <Select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Select>
                </Label>
                <Label>
                    강좌 가격:
                    <Input type="number" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required />
                </Label>
                <Label>
                    강좌 설명:
                    <Input type="text" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required />
                </Label>
                <Label>
                    강좌 과목:
                    <Input type="text" value={courseAttribute} onChange={(e) => setCourseAttribute(e.target.value)} required />
                </Label>
                <Button type="submit">수정</Button>
            </form>
        </Container>
    );
};

export default CourseUpdate;

const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: #f9f9f9;
    border-radius: 8px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
`;

const SuccessMessage = styled.p`
    color: green;
    font-weight: bold;
`;
