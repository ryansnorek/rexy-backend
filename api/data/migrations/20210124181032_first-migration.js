exports.up = async (knex) => {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 333).notNullable().unique();
      users.string("password", 333).notNullable();
      users.string("phone", 10).notNullable().unique();
      users.string("email", 333).notNullable().unique();
      users.string("display_name", 333);
      users.string("personality_type", 4);
      users.string("uploaded_image", 2000);
      users.boolean("admin").defaultsTo(false);
      users.timestamps(false, true);
    })
    .createTable("user_movies", (user_movies) => {
      user_movies.increments("user_movie_id");
      user_movies.integer("movie_id").notNullable();
      user_movies.timestamps(false, true);
      user_movies
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("user_tv_shows", (user_tv_shows) => {
      user_tv_shows.increments("user_tv_show_id");
      user_tv_shows.integer("tv_show_id").notNullable();
      user_tv_shows.timestamps(false, true);
      user_tv_shows
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("watchlist_movies", (watchlist_movies) => {
      watchlist_movies.increments("watchlist_movie_id");
      watchlist_movies.integer("movie_id").notNullable();
      watchlist_movies.timestamps(false, true);
      watchlist_movies
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("watchlist_shows", (watchlist_shows) => {
      watchlist_shows.increments("watchlist_show_id");
      watchlist_shows.integer("show_id").notNullable();
      watchlist_shows.timestamps(false, true);
      watchlist_shows
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("rexy_movies", (rexy_movies) => {
      rexy_movies.increments("rexy_movie_id");
      rexy_movies.integer("movie_id").notNullable();
      rexy_movies.integer("relative_user_id")
      rexy_movies.timestamps(false, true);
      rexy_movies
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("rexy_shows", (rexy_shows) => {
      rexy_shows.increments("rexy_show_id");
      rexy_shows.integer("show_id").notNullable();
      rexy_shows.integer("relative_user_id")
      rexy_shows.timestamps(false, true);
      rexy_shows
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("user_relationships", (user_relationships) => {
      user_relationships.increments("user_relationship_id");
      user_relationships.boolean("blocked")
      user_relationships.boolean("following")
      user_relationships.boolean("follower")
      user_relationships
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
      user_relationships
        .integer("relative_user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("user_relationships")
    .dropTableIfExists("rexy_shows")
    .dropTableIfExists("rexy_movies")
    .dropTableIfExists("watchlist_shows")
    .dropTableIfExists("watchlist_movies")
    .dropTableIfExists("user_tv_shows")
    .dropTableIfExists("user_movies")
    .dropTableIfExists("users")
};
