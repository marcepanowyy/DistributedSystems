from typing import List, Optional
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from fastapi import HTTPException

postgres = []


class Answer(BaseModel):

    uuid: Optional[UUID] = Field(default_factory=uuid4)
    answer: str
    votes: int = 0


class Question(BaseModel):

    uuid: Optional[UUID] = Field(default_factory=uuid4)
    question: str
    answers: List[Answer]


class Poll(BaseModel):

    uuid: Optional[UUID] = Field(default_factory=uuid4)
    questions: List[Question]
    created_at: Optional[str] = None


poll1 = Poll(
    questions=[
        Question(
            question="What is the best programming language?",
            answers=[
                Answer(answer="Python"),
                Answer(answer="C++"),
                Answer(answer="Java"),
            ],
        ),
        Question(
            question="What is the best database?",
            answers=[
                Answer(answer="Postgres"),
                Answer(answer="MySQL"),
                Answer(answer="SQLite"),
                Answer(answer="MongoDB"),
            ],
        )
    ]
)

poll2 = Poll(
    questions=[
        Question(
            question="What is the best Cloud Provider?",
            answers=[
                Answer(answer="AWS"),
                Answer(answer="Azure"),
                Answer(answer="GCP"),
            ],
        ),
        Question(
            question="What is the best OS?",
            answers=[
                Answer(answer="Windows"),
                Answer(answer="Linux"),
                Answer(answer="MacOS"),
            ],
        ),
        Question(
            question="What is the best shool subject?",
            answers=[
                Answer(answer="Math"),
                Answer(answer="Science"),
                Answer(answer="History"),
            ],
        )
    ]
)

postgres.append(poll1)
postgres.append(poll2)


# GET


def find_polls():

    return postgres


def find_poll(poll_id: UUID):

    for poll in postgres:
        if poll.uuid == poll_id:
            return poll

    raise HTTPException(status_code=404, detail="Poll not found")


# POST


def create_poll(poll: Poll):

    postgres.append(poll)
    return poll


def add_question(poll_id: UUID, question: Question):

    for p in postgres:
        if p.uuid == poll_id:
            p.questions.append(question)
            return question

    raise HTTPException(status_code=404, detail="Poll not found")


def add_answer(poll_id: UUID, question_id: UUID, answer: Answer):

    for p in postgres:
        if p.uuid == poll_id:
            for q in p.questions:
                if q.uuid == question_id:
                    q.answers.append(answer)
                    return answer

    raise HTTPException(status_code=404, detail="Poll or Question not found")


def vote(poll_id: UUID, question_id: UUID, answer_id: UUID):

    for p in postgres:
        if p.uuid == poll_id:
            for q in p.questions:
                if q.uuid == question_id:
                    for a in q.answers:
                        if a.uuid == answer_id:
                            a.votes += 1
                            return a

    raise HTTPException(status_code=404, detail="Poll, Question or Answer not found")


# PUT


def update_poll(poll_id: UUID, poll: Poll):

    for i, p in enumerate(postgres):
        if p.uuid == poll_id:
            postgres[i] = poll
            return poll

    raise HTTPException(status_code=404, detail="Poll not found")


def update_question(poll_id: UUID, question_id: UUID, question: Question):

    for p in postgres:
        if p.uuid == poll_id:
            for q in p.questions:
                if q.uuid == question_id:
                    q = question
                    return q

    raise HTTPException(status_code=404, detail="Poll or Question not found")


def update_answer(poll_id: UUID, question_id: UUID, answer_id: UUID, answer: Answer):

    for p in postgres:
        if p.uuid == poll_id:
            for q in p.questions:
                if q.uuid == question_id:
                    for a in q.answers:
                        if a.uuid == answer_id:
                            a = answer
                            return a

    raise HTTPException(status_code=404, detail="Poll, Question or Answer not found")

# DEL


def delete_poll(poll_id: UUID):

    for i, p in enumerate(postgres):
        if p.uuid == poll_id:
            postgres.pop(i)
            return poll_id

    raise HTTPException(status_code=404, detail="Poll not found")


def delete_answer(poll_id: UUID, question_id: UUID, answer_id: UUID):

    for p in postgres:
        if p.uuid == poll_id:
            for q in p.questions:
                if q.uuid == question_id:
                    for i, a in enumerate(q.answers):
                        if a.uuid == answer_id:
                            q.answers.pop(i)
                            return answer_id

    raise HTTPException(status_code=404, detail="Poll, Question or Answer not found")


def delete_question(poll_id: UUID, question_id: UUID):

    for p in postgres:
        if p.uuid == poll_id:
            for i, q in enumerate(p.questions):
                if q.uuid == question_id:
                    p.questions.pop(i)
                    return question_id

    raise HTTPException(status_code=404, detail="Poll or Question not found")
