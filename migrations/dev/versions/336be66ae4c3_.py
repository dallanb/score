"""empty message

Revision ID: 336be66ae4c3
Revises: 408aa422ed9c
Create Date: 2020-08-19 23:55:38.184476

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = '336be66ae4c3'
down_revision = '408aa422ed9c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'contest', ['uuid'])
    op.create_unique_constraint(None, 'score', ['uuid'])
    op.create_unique_constraint(None, 'status', ['name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'status', type_='unique')
    op.drop_constraint(None, 'score', type_='unique')
    op.drop_constraint(None, 'contest', type_='unique')
    # ### end Alembic commands ###