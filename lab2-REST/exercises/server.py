from fastapi import FastAPI
from uuid import UUID

import db


app = FastAPI()


@app.get("/poll/")
async def get_polls():
    return db.get_polls()


@app.get("/poll/{poll_id}")
async def get_poll(poll_id: UUID):
    return db.get_poll(poll_id)


@app.get("/poll/{poll_id}/vote/{vote_id}")
async def get_vote(poll_id: UUID, vote_id: UUID):
    return db.get_vote(poll_id, vote_id)


@app.put("/poll/{poll_id}")
async def update_poll(poll_id: UUID, poll: db.Poll):
    return db.update_poll(poll_id, poll)


@app.put("/poll/{poll_id}/vote/{vote_id}")
async def update_vote(poll_id: UUID, vote_id: UUID, vote: db.Vote):
    return db.update_vote(poll_id, vote_id, vote)


@app.post("/poll/")
async def create_poll(poll: db.Poll):
    return db.create_poll(poll)


@app.post("/poll/{poll_id}/vote/")
async def create_vote(poll_id: UUID, vote: db.Vote):
    return db.create_vote(poll_id, vote)


@app.delete("/poll/{poll_id}")
async def delete_poll(poll_id: UUID):
    return db.delete_poll(poll_id)


@app.delete("/poll/{poll_id}/vote/{vote_id}")
async def delete_vote(poll_id: UUID, vote_id: UUID):
    return db.delete_vote(poll_id, vote_id)

