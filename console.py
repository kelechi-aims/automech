#!/usr/bin/python3
""" Command line interperter """
import cmd
from datetime import datetime
import shlex # for line splitting

class AUTMCommand(cmd.Cmd):
    """ AutoMech Locator console """
    prompt = '(autm) '

    def do_EOF(self, arg):
        """ Exits the console """
        return True
    def emptyline(self):
        """ shouldn’t execute anything """
        return False
    def do_quit(self, arg):
        """ Quits console """
        return True

if __name__ == '__main__':
    AUTMCommand().cmdloop()
