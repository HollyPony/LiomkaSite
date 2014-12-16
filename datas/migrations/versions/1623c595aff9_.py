"""empty message

Revision ID: 1623c595aff9
Revises: 
Create Date: 2014-12-16 13:05:54.685000

"""

# revision identifiers, used by Alembic.
revision = '1623c595aff9'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

def upgrade():
    # Structure
    tag = op.create_table('tag',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    project = op.create_table('project',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('title', sa.String(), nullable=False),
                    sa.Column('description', sa.String(), nullable=False),
                    sa.Column('content', sa.String(), nullable=False),
                    sa.Column('is_professional', sa.Boolean(), nullable=False),
                    sa.Column('ordering', sa.Integer(), nullable=True),
                    sa.Column('date_last_update', sa.DateTime(), nullable=False),
                    sa.Column('date_creation', sa.DateTime(), nullable=False),
                    sa.Column('preview', sa.String(), nullable=True),
                    sa.Column('anchor_name', sa.String(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('ordering')
                    )
    projecttags = op.create_table('projecttags',
                    sa.Column('project_id', sa.Integer(), nullable=False),
                    sa.Column('tag_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
                    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], )
                    )
    op.create_index(op.f('ix_projecttags_tag_id'), 'projecttags', ['tag_id'], unique=False)
    sub_project = op.create_table('sub_project',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(), nullable=False),
                    sa.Column('content', sa.String(), nullable=False),
                    sa.Column('ordering', sa.Integer(), nullable=True),
                    sa.Column('anchor_name', sa.String(), nullable=True),
                    sa.Column('project_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    # ------------------------------------------------------------------------------------------------------------------
    # Datas

    # Tag
    op.bulk_insert(
        tag,
        [
            {'id': 1,   'name': "Websockets"},
            {'id': 2,   'name': "CrossPlatform"},
            {'id': 3,   'name': "NewTechnology"},
            {'id': 4,   'name': "Git"},
            {'id': 5,   'name': "Qt"},
            {'id': 6,   'name': "Qt5"},
            {'id': 7,   'name': "JSon"},
            {'id': 8,   'name': "RestApi"},
            {'id': 9,   'name': "SQLite"},
            {'id': 10,  'name': "QtCreator"},
            {'id': 11,  'name': "Mac OSX"},
            {'id': 12,  'name': "Windows"},
            {'id': 13,  'name': "Python"},
            {'id': 14,  'name': "BootStrap"},
            {'id': 15,  'name': "JQuery"},
            {'id': 16,  'name': "Stellar.js"},
            {'id': 17,  'name': "uwsgi"}
        ]
    )

    # Project
    op.bulk_insert(
        project,
        [
            {
                'id': 1,
                'title': 'WebSockets chat',
                'description': '',
                'content': '''<h5 class="title">What is that ?</h5><p>Pulp is a multi-platform chat based on WebSocket.</p><p>I've made a client/server chat application using the WebSocket implementation in a selection of programming languages.</p><p>The WebSocket protocol replace the http for fastest communication between computers. Unfortunatelly it's also less secure. For this project, I choose to develop a chat, because it's easy to show, but we can easily use WebSocket for geolocalisation, game, social-innovative-meeting-mobile-app!</p><p>The whole project is available on this <a href="https://bitbucket.org/Liomka/pulp">BitBucket page</a> as git submodules</p><p>For the communication, JSON is the winner, for the lightweight. It's obvious, for a lightweight protocol, the most lightweight data transmission is what I need.</p><h5 class="title">Why ?</h5><p>Cause I love new technology, POCs, Test and adventure on libs without example.</p><h5 class="title">How I did it ...</h5> <h5>Goto: <a href="#pulp-javascript">Js</a> | <a href="#pulp-qt">Qt</a> | <a href="#pulp-python">Python</a> | Ruby (Soon) | <a href="#pulp-android">Android</a> | <a href="#pulp-java">Java</a> </h5>''',
                'date_last_update': '2014-12-14 14:20:40.068',
                'date_creation': '2014-12-14 14:20:40.068',
                'preview': '',
                'name': 'Pulp',
                'is_professional': 'f',
                'ordering': '0',
                'anchor_name': 'pulp'
            },
            {
                'id': 2,
                'title': 'also known as Serizer',
                'description': '',
                'content': '''<div class="alert alert-warning" role="alert">This section is under construction.</div>''',
                'date_last_update': '2014-12-14 14:20:40.068',
                'date_creation': '2014-12-14 14:20:40.068',
                'preview': '',
                'name': 'Pulm',
                'is_professional': 'f',
                'ordering': '1',
                'anchor_name': 'pulm'
            },
            {
                'id': 3,
                'title': 'liomka.io',
                'description': '',
                'content': '''<div class="alert alert-warning" role="alert">This section is under construction.</div><p>This site run on a Python <a href="http://www.tornadoweb.org/en/stable/">Tornado web</a> server using pip. It's using bootstrap, jquery and some lib I describe on the GitHub page.</p>''',
                'date_last_update': '2014-12-14 14:20:40.068',
                'date_creation': '2014-12-14 14:20:40.068',
                'preview': '',
                'name': 'This site',
                'is_professional': 'f',
                'ordering': '2',
                'anchor_name': 'this-site'
            },
        ]
    )

    # Sub_Project
    op.bulk_insert(
        sub_project,
        [
            {
                'id': 1,
                'project_id': 1,
                'title': 'Javascript',
                'content': '''<h5>Please refer to the <a href="/demo">demo page</a>.</h5>''',
                'anchor_name': 'javascript',
                'ordering': 1
            },
            {
                'id': 2,
                'project_id': 1,
                'title': 'Qt',
                'content': '''<div class="alert alert-warning" role="alert"><p>This section is under construction.</p><p>You can find the source of the client on this <a href="https://bitbucket.org/Liomka/qwsclient">BitBucket page</a></p><p>You can find the source of the server on this <a href="https://bitbucket.org/Liomka/qwsserver">BitBucket page</a></p></div><p>While I was developing the Pulp Project, I saw a new version of Qt: 5.3. Ho Woah! It's new! And what? It's implementing WebSocket protocol?</p><p>And that's it. Two day after I had finished the skeleton of the chat server, working with multiple clients on Javascript and an other simple Qt client.</p> ''',
                'anchor_name': 'qt',
                'ordering': 2
            },
            {
                'id': 3,
                'project_id': 1,
                'title': 'Python',
                'content': '''<div class="alert alert-warning" role="alert"><p>This section is under construction.</p><p>You can find the source of the server on this <a href="https://github.com/liomka/PyWSServer">GitHub page</a></p></div><p>It's a very interesting part of the project. Here, I can learn to make a Python server, which was surprisingly fast. For this, I used a Cyclone server, because it seems to be best implementation of WebSocket server.</p><p>Python is for me a very interesting language to its flexibility, documentation, and flexibility.</p> ''',
                'anchor_name': 'python',
                'ordering': 3
            },
            {
                'id': 4,
                'project_id': 1,
                'title': 'Android',
                'content': '''<div class="alert alert-warning" role="alert"><p>This section is under construction.</p><p>You can find the source of the client on this <a href="https://bitbucket.org/Liomka/androidwsclient">BitBucket page</a></p></div>''',
                'anchor_name': 'android',
                'ordering': 4
            },
            {
                'id': 5,
                'project_id': 1,
                'title': 'Java',
                'content': '''<div class="alert alert-warning" role="alert"><p>This section is under construction.</p><p>You can find the source of the client on this <a href="https://bitbucket.org/Liomka/jwsclient">BitBucket page</a></p><p>You can find the source of the server on this <a href="https://bitbucket.org/Liomka/jwsserver">BitBucket page</a></p></div>''',
                'anchor_name': 'java',
                'ordering': 5
            }
        ]
    )

    # Projecttags
    op.bulk_insert(
        projecttags,
        [
            {'project_id': 1, 'tag_id': 1},
            {'project_id': 1, 'tag_id': 2},
            {'project_id': 1, 'tag_id': 3},
            {'project_id': 1, 'tag_id': 4},
            {'project_id': 2, 'tag_id': 6},
            {'project_id': 2, 'tag_id': 7},
            {'project_id': 2, 'tag_id': 8},
            {'project_id': 2, 'tag_id': 9},
            {'project_id': 2, 'tag_id': 10},
            {'project_id': 2, 'tag_id': 11},
            {'project_id': 2, 'tag_id': 12},
            {'project_id': 3, 'tag_id': 13},
            {'project_id': 3, 'tag_id': 14},
            {'project_id': 3, 'tag_id': 15},
            {'project_id': 3, 'tag_id': 16},
            {'project_id': 3, 'tag_id': 17},
            {'project_id': 3, 'tag_id': 4}
        ]
    )


def downgrade():
    op.drop_table('sub_project')
    op.drop_index(op.f('ix_projecttags_tag_id'), table_name='projecttags')
    op.drop_table('projecttags')
    op.drop_table('project')
    op.drop_table('tag')
