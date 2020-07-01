# Parcels Core

Simple REST-API using only Express and node-postgres.

## Setup

Run **docker-compose up**, which will setup the database tables and dummydata. App accessible on http://localhost:3000/parcels.

## Endpoints:

### POST /parcels

    curl --request POST --data '{"height": 2, "width": 2, "length": 2}' --header "Content-Type: application/json" http://localhost:3000/parcels

### GET /parcels, /parcels?page=:pageNum or /parcels/:parcelId

    curl http://localhost:3000/parcels
    curl http://localhost:3000/parcels?page=2
    curl http://localhost:3000/parcels/:parcelId

## PUT /parcels/:parcelId

    curl --request PUT --data '{"width": 21, "height": 22, "length": 3}' --header "Content-Type: application/json" http://localhost:3000/parcels/2

## DELETE /parcels/:parcelId

    curl --request DELETE --header "Content-Type: application/json" http://localhost:3000/parcels/3
