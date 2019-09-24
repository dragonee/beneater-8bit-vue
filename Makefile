.PHONY: config deployconfig

ifeq (, $(shell which editor))
$(error "No editor in $(PATH), consider symlinking vim, emacs or nano.")
endif

config: beneater/settings/db.py
deployconfig: beneater/settings/email.py

beneater/settings/db.py: beneater/settings/db.py.base
	cp beneater/settings/db.py.base beneater/settings/db.py
	editor beneater/settings/db.py

beneater/settings/email.py: beneater/settings/email.py.base
	cp beneater/settings/email.py.base beneater/settings/email.py
	editor beneater/settings/email.py

# vim: set noet:
