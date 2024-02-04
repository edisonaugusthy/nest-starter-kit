FROM mongo

ARG MONGO_CONNECTION
ENV MONGO_CONNECTION=$MONGO_CONNECTION
RUN mkdir /app
WORKDIR /app

COPY mongo-seed/collections ./mongo-seed/collections
RUN echo $MONGO_CONNECTION

# CMD mongoimport --uri=$MONGO_CONNECTION --collection User --file mongo-seed/collections/user.json --upsert --upsertFields name --jsonArray && \
#     mongoimport --uri=$MONGO_CONNECTION --collection Admin --file mongo-seed/collections/admin.json --upsert --upsertFields name --jsonArray