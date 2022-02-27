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
    .createTable("user_profile", (user_profile) => {
      user_profile.increments("user_profile_id");
      user_profile.string("display_name", 333);
      user_profile.string("personality_type", 4);
      user_profile.string("uploaded_image", 2000);
      user_profile.timestamps(false, true);
      user_profile
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
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
    .dropTableIfExists("user_tv_shows")
    .dropTableIfExists("user_movies")
    .dropTableIfExists("user_profile")
    .dropTableIfExists("users");
};
