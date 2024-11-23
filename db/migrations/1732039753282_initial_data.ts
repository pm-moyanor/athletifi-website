import type { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
    INSERT INTO
      age_groups (age_group_id, title, description)
    VALUES
      (
        '3a89f5f5-8f9f-4dc0-8095-f1f2697d7c28',
        'U8',
        'Under 8 years old'
      ),
      (
        '1e54c474-4be0-456c-8297-950d7e770b01',
        'U9',
        'Under 9 years old'
      ),
      (
        'd9dcec14-3046-47fe-b97c-242f26e76401',
        'U10',
        'Under 10 years old'
      ),
      (
        '59aa86d6-df50-43d6-8c8c-c7e1294b780f',
        'U11',
        'Under 11 years old'
      ),
      (
        '26de7af2-769f-4902-9902-206a763ff4ba',
        'U12',
        'Under 12 years old'
      ),
      (
        '06418929-5001-4c7e-8435-90dd30f67fe3',
        'U13',
        'Under 13 years old'
      ),
      (
        '961011c2-0277-4cbf-95a3-2dd1e1b9ec0b',
        'U14',
        'Under 14 years old'
      ),
      (
        'bb9ceab0-e3d5-4517-aac7-9d5ca5a509ca',
        'U15',
        'Under 15 years old'
      ),
      (
        '2b6b5326-17ca-4d1c-879a-e7f9c5c4b0a4',
        'U16',
        'Under 16 years old'
      ),
      (
        '58dba694-92a3-4ed9-8be6-7bed5e44faf9',
        'U17',
        'Under 17 years old'
      )`);

  pgm.sql(`
    INSERT INTO
      match_events_descriptions (
        event_description_id,
        event_type,
        event_description
      )
    VALUES
      (
        '292c58bc-840c-401a-8f28-dcee028d4fe7',
        'aerial_clearance_success',
        'fearlessly claims the aerial ball, denying the opposition!'
      ),
      (
        '34bfc5bc-ebeb-4ce6-9f2f-9acb3d3e0578',
        'aerial_clearance_fail',
        'bravely challenges for the high ball, but it slips away!'
      ),
      (
        '1b340a85-28ff-40c7-9425-0e1402bc9984',
        'aerial_duel_success',
        'soars through the air, winning the aerial duel!'
      ),
      (
        '5e716d67-5d4e-4ea9-abf4-8ffaa7a0271a',
        'aerial_duel_fail',
        'leaps for the ball but can''t quite reach it!'
      ),
      (
        '3e4c4ff6-2e72-4def-97ea-1abab8fd7443',
        'assist',
        'delivers an inch-perfect pass that sets up the goal!'
      ),
      (
        'fc6f86ee-1877-44fc-a55a-6418639aa081',
        'block',
        'makes a heroic block to keep the score level!'
      ),
      (
        'ca1e2e1e-0a4c-4aee-b721-8d32e31673ad',
        'catch',
        'confidently gathers the ball into their grasp.'
      ),
      (
        'a9d6b9a5-9713-4606-ac87-090555e96232',
        'clearance',
        'boots the ball clear, averting the danger!'
      ),
      (
        '368364ad-66ac-4f88-b3e9-b74e94b810d8',
        'poor_ball_handling',
        'has a momentary lapse in control, but recovers quickly!'
      ),
      (
        '02580d82-5ac5-4260-b353-6571dbf6c49e',
        'cross_success',
        'whips in a teasing cross, creating a chance!'
      ),
      (
        'c7fa97b2-ee06-4247-a421-84c7cc089209',
        'cross_fail',
        'crosses the ball with good intentions, but the defense clears it.'
      ),
      (
        '045174ea-46f1-46fb-a74b-81dbc9c4db22',
        'foul_won',
        'draws the foul, earning a free kick for their team!'
      ),
      (
        '59d594cb-68a2-40e3-9fae-e6f7cc310806',
        'goal_kick_success',
        'launches a counter-attack with a booming goal kick!'
      ),
      (
        'f0188bc1-4078-4e49-b770-28d36cd767c1',
        'goal_kick_fail',
        'takes the goal kick, but it''s intercepted, putting the defense under pressure.'
      ),
      (
        'd5ec3091-84e8-465f-929c-f8a6e8964da9',
        'goal_conceded',
        'concedes a goal, but the team will fight back!'
      ),
      (
        '51588bf9-3509-46ac-9553-bef8dc876957',
        'goal_scored',
        'scores a screamer!'
      ),
      (
        'bdbaca0c-f869-4f8b-b21b-1171413880c7',
        'ground_duel_success',
        'shows strength, winning the ground duel.'
      ),
      (
        '1de57086-252a-43df-ac94-a7303840004d',
        'is_goalkeeper',
        'N/A - This is a data point, not an action for highlight videos'
      ),
      (
        '5cec59b6-8cfc-4ceb-9810-0493aee673a3',
        'ground_duel_fail',
        'is outmuscled in the challenge for the ball.'
      ),
      (
        '67914b73-8062-491e-b622-166e2c75fdf0',
        'interception',
        'reads the pass perfectly and intercepts!'
      ),
      (
        'a33f574a-48dd-438e-9cf6-a3796bb8a755',
        'intervention',
        'makes a crucial intervention that thwarts the attack!'
      ),
      (
        '35cfc0ca-d77e-4d77-86d7-9ec8c28d6b94',
        'key_pass',
        'splits the defense with a killer pass!'
      ),
      (
        'b8ced747-1405-48bf-b0eb-f8acdfd4aabc',
        'long_pass_success',
        'pings a pinpoint long ball to switch the play!'
      ),
      (
        'ff105f67-9172-4112-a125-f51ca2488a8d',
        'long_pass_fail',
        'makes an ambitious long pass, but it is just out of reach.'
      ),
      (
        '5324ca81-6d17-4f90-8b49-1ca3928bd9d8',
        'middle_pass_success',
        'delivers a crisp pass that finds a teammate in space.'
      ),
      (
        '691abfe4-594a-45d6-9c61-efda9738ebf5',
        'middle_pass_fail',
        'attempts a pass, but it''s intercepted, halting the attack.'
      ),
      (
        'b2043bec-0de7-4f9e-87dd-611ed91cc7b9',
        'pass_forward_success',
        'threads a pass through the lines!'
      ),
      (
        'f2370ae8-3334-4262-b09c-1ea45bae93ed',
        'pass_forward_fail',
        'attempts a forward pass, but the opposition cuts it out.'
      ),
      (
        '77875e92-c9f6-4a4f-9ed0-73f8fa5dfa49',
        'pass_final_third_success',
        'passes the ball into the final third, creating a dangerous opportunity!'
      ),
      (
        '32f2dfd1-716f-4eb5-9f3b-a77dec6b6c93',
        'pass_final_third_fail',
        'attempts a pass into the final third, but it''s intercepted.'
      ),
      (
        '18a1904c-51f4-4f20-bea4-b4ebd6673a94',
        'pass_success',
        'delivers a pass that finds its mark!'
      ),
      (
        '25d14c1e-92d9-4093-a60b-2ad196f3bae9',
        'pass_fail',
        'unfortunately misplaces the pass.'
      ),
      (
        '6676419b-0362-4786-85fe-6b3dd39e366a',
        'punch',
        'punches the ball away from danger'
      ),
      (
        '3dee9e4b-1097-4357-8526-19fb0ffff285',
        'red_card',
        'is shown a red card and is sent off!'
      ),
      (
        '695fdf0e-46f4-40e6-8d52-7e05c6469fbf',
        'shot_on_target',
        'forces a save from the goalkeeper'
      ),
      (
        'a2c0e5a1-d1a1-41a2-9e32-cc736195cb6b',
        'shot_off_target',
        'takes a shot, but it misses the mark.'
      ),
      (
        '08569f36-18d3-4101-9ba1-c69c1f5ccb06',
        'shot_on_post',
        'unleashes a shot that rattles the woodwork!'
      ),
      (
        '1dc7260d-016a-4cf9-a888-c54b5e0fcfa4',
        'shot_outside_penalty_area',
        'lets fly from distance'
      ),
      (
        'bbf523a7-63e0-4fe3-92d3-658f688c7dce',
        'tackle_success',
        'times the tackle to perfection, winning back possession!'
      ),
      (
        '315d8dab-68b5-4260-8dee-2c2aad412d22',
        'tackle_fail',
        'attempts a tackle, but it''s unsuccessful.'
      ),
      (
        '5d58dbb5-e3bc-42dc-b081-c691469d068d',
        'dribble_success',
        'weaves through the opposition with a mesmerizing dribble!'
      ),
      (
        '828aa7ae-aac1-461c-bbab-6ee6cc5729bb',
        'dribble_fail',
        'attempts a dribble, but it''s cut short by the opposition.'
      ),
      (
        'b9fa79e7-94ef-431b-acd9-535628a554fc',
        'yellow_card',
        'is cautioned with a yellow card for the action.'
      )`);

  pgm.sql(`
    INSERT INTO
      notification_types (type_id, name, notification_mode)
    VALUES
      (
        '96f29e05-996d-4fdb-84c1-d7b841311893',
        'my_player_updates',
        'email'
      ),
      (
        '279536dc-fe47-44fd-a9a7-4bfb49530711',
        'general_highlights',
        'email'
      ),
      (
        'e423ec3b-70af-4aa2-b759-c998f5034549',
        'athletifi_updates',
        'email'
      ),
      (
        'dac487a9-26b6-446c-bf90-d2f780f72f84',
        'referral_notifications',
        'email'
      )`);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`DELETE FROM age_groups`);
  pgm.sql(`DELETE FROM match_events_descriptions`);
  pgm.sql(`DELETE FROM notification_types`);
}
