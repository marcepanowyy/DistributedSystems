from typing import List, Optional
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from fastapi import HTTPException
from datetime import date

postgres = []


class Vote(BaseModel):

    uuid: Optional[UUID] = Field(default_factory=uuid4)
    answer: str


class Poll(BaseModel):

    uuid: Optional[UUID] = Field(default_factory=uuid4)
    question: str
    votes: List[Vote]
    created_at: Optional[str] = None


poll1 = Poll(
    question="What is the best programming language?",
    votes=[
        Vote(answer="Python"),
        Vote(answer="C++"),
        Vote(answer="Java"),
        Vote(answer="TypeScript"),
    ],
    created_at=str(date.today())
)

poll2 = Poll(
    question="What is the best database?",
    votes=[
        Vote(answer="Postgres"),
        Vote(answer="MySQL"),
        Vote(answer="SQLite"),
        Vote(answer="MongoDB"),
        Vote(answer="DynamoDB"),
    ],
    created_at=str(date.today())
)

postgres.extend([poll1, poll2])


# GET


def get_polls():

    return postgres


def get_poll(poll_id: UUID):

    for poll in postgres:
        if poll.uuid == poll_id:
            return poll

    raise HTTPException(status_code=404, detail="Poll not found")


def get_vote(poll_id: UUID, vote_id: UUID):

    poll = get_poll(poll_id)

    for vote in poll.votes:
        if vote.uuid == vote_id:
            return vote

    raise HTTPException(status_code=404, detail="Vote not found")


# PUT

def update_poll(poll_id: UUID, poll_data: Poll):

    poll = get_poll(poll_id)
    if poll_data.question:
        poll.question = poll_data.question
    if poll_data.votes:
        poll.votes = poll_data.votes

    return poll


def update_vote(poll_id: UUID, vote_id: UUID, vote_data: Vote):

    vote = get_vote(poll_id, vote_id)

    if vote_data.answer:
        vote.answer = vote_data.answer

    return vote


# POST


def create_poll(poll: Poll):

    poll.created_at = str(date.today())
    postgres.append(poll)

    return poll


def create_vote(poll_id: UUID, vote: Vote):

    poll = get_poll(poll_id)
    poll.votes.append(vote)

    return vote


# DELETE


def delete_poll(poll_id: UUID):

    poll = get_poll(poll_id)
    postgres.remove(poll)

    return poll


def delete_vote(poll_id: UUID, vote_id: UUID):

    poll = get_poll(poll_id)
    vote = get_vote(poll_id, vote_id)
    poll.votes.remove(vote)

    return vote